# campaigns/views.py

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Campaign
from .serializers import CampaignSerializer
from userauth.models import UserProfile
from .models import Campaign
from email_list.models import EmailList  # Ändra importen till rätt plats
from email_validator import validate_email, EmailNotValidError 
import json
from django.conf import settings
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.utils import timezone
from rest_framework.views import APIView

class CampaignList(generics.ListAPIView):
    serializer_class = CampaignSerializer

    def get_queryset(self):
        user = self.request.user
        user_profile = user.userprofile

        if user_profile.role == 'SuperAdmin':
            return Campaign.objects.all()  # SuperAdmin ser alla kampanjer
        elif user_profile.role == 'Admin':
            # Admin ser endast kampanjer för tillåtna företag
            return Campaign.objects.filter(company__in=user_profile.companies.all())
        else:  # Client
            # Client ser endast sina egna kampanjer
            return Campaign.objects.filter(owner=user)

# Hanterar vyer för enskilda kampanjer (hämta, uppdatera, radera)
class CampaignDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    
class EmailListUploadView(generics.GenericAPIView):
    """
    Ladda upp och spara e-postlistor för en specifik kampanj med validering av e-postadresser.
    """
    def post(self, request, campaign_id):
        campaign = Campaign.objects.get(pk=campaign_id)
        
        # Hämta JSON-data från den inkommande förfrågan
        try:
            email_data = json.loads(request.body)  # Om det skickas som en raw JSON
        except json.JSONDecodeError:
            return Response({"error": "Ogiltig JSON-fil."}, status=status.HTTP_400_BAD_REQUEST)

        invalid_emails = []
        valid_email_count = 0

        for category, subcategories in email_data.items():
            # Hantera "with_website" e-postadresser
            for email_entry in subcategories.get('with_website', []):
                email = email_entry['email']
                try:
                    # Validera e-postadressen
                    valid = validate_email(email, check_deliverability=True)
                    normalized_email = valid.email

                    # Skapa EmailList-objekt om e-posten är giltig
                    EmailList.objects.create(
                        campaign=campaign,
                        email=normalized_email,
                        name=email_entry['name'],
                        categories=email_entry['categories'],
                        has_website=True
                    )
                    valid_email_count += 1

                except EmailNotValidError as e:
                    # Om e-posten är ogiltig, lägg till i listan över ogiltiga adresser
                    invalid_emails.append({"email": email, "reason": str(e)})

            # Hantera "without_website" e-postadresser
            for email_entry in subcategories.get('without_website', []):
                email = email_entry['email']
                try:
                    # Validera e-postadressen
                    valid = validate_email(email, check_deliverability=True)
                    normalized_email = valid.email

                    # Skapa EmailList-objekt om e-posten är giltig
                    EmailList.objects.create(
                        campaign=campaign,
                        email=normalized_email,
                        name=email_entry['name'],
                        categories=email_entry['categories'],
                        city=email_entry.get('city', None),
                        has_website=False
                    )
                    valid_email_count += 1

                except EmailNotValidError as e:
                    # Om e-posten är ogiltig, lägg till i listan över ogiltiga adresser
                    invalid_emails.append({"email": email, "reason": str(e)})

        # Returnera ett svar som innehåller både validerade och ogiltiga e-postadresser
        response_data = {
            "message": "E-postlistan har laddats upp.",
            "valid_emails": valid_email_count,
            "invalid_emails": invalid_emails
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
    
class SendCampaignEmailsView(APIView):
    def post(self, request, campaign_id):
        campaign = Campaign.objects.get(id=campaign_id)
        company = campaign.company
        email_list = EmailList.objects.filter(campaign=campaign)
        
        # Kontrollera om företaget har nått sitt dagliga maxantal mejl
        if company.sent_today >= company.daily_email_limit:
            return Response({"error": "Maxantal mejl för dagen är nått."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Kontrollera om utskick är tillåtna vid denna tidpunkt
        current_time = timezone.now().time()
        allowed_start_time = datetime.strptime('08:00', '%H:%M').time()
        allowed_end_time = datetime.strptime('18:00', '%H:%M').time()
        
        if not allowed_start_time <= current_time <= allowed_end_time:
            return Response({"error": "Mejl får bara skickas mellan 08:00 och 18:00."}, status=status.HTTP_400_BAD_REQUEST)
        
        # För varje e-postadress i listan, skicka e-post
        for email_entry in email_list:
            if company.sent_today >= company.daily_email_limit:
                break  # Stoppa om företaget når sin maxgräns för dagen

            send_mail(
                subject=campaign.name,
                message=campaign.email_template,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email_entry.email],
                fail_silently=False,
            )
            
            # Uppdatera räknare
            company.sent_today += 1
            company.save()

        return Response({"message": f"{company.sent_today} mejl skickades idag."}, status=status.HTTP_200_OK)
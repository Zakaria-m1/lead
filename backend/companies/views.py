# Uppdatera en vy för att få statistik för ett företag
from rest_framework.views import APIView
from rest_framework.response import Response
from companies.models import Company
from django.http import HttpResponse
import csv
from companies.models import Company
from campaigns.models import Campaign


class CompanyStatisticsView(APIView):
    def get(self, request, company_id):
        try:
            company = Company.objects.get(id=company_id)

            # Check if the user is allowed to view the company's statistics
            if request.user.userprofile.role == 'SuperAdmin' or \
               (request.user.userprofile.role == 'Admin' and company in request.user.userprofile.companies.all()) or \
               Campaign.objects.filter(company=company, owner=request.user).exists():
                company.update_company_statistics()  # Update statistics dynamically

                return Response({
                    "name": company.name,
                    "total_sent_emails": company.total_sent_emails,
                    "sent_today": company.sent_today,
                    "total_replies": company.total_replies,
                    "interested_leads": company.interested_leads,
                    "meetings_booked": company.meetings_booked,
                    "revenue": company.revenue,
                    "commission_earned": company.commission_earned,
                    "open_rate": company.open_rate,
                    "click_rate": company.click_rate,
                    "bounce_rate": company.bounce_rate,
                    "unsubscribe_rate": company.unsubscribe_rate,
                })
            else:
                return Response({"detail": "You are not authorized to view this company's data."}, status=403)
        
        except Company.DoesNotExist:
            return Response({"detail": "Company not found."}, status=404)

class CompanyStatisticsExportView(APIView):
    """
    Endpoint för att exportera företagets statistik till CSV.
    """
    def get(self, request, company_id, format=None):
        company = Company.objects.get(id=company_id)
        company.update_company_statistics()  # Uppdatera statistiken

        # Förbered CSV-exporten
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{company.name}_statistics.csv"'
        writer = csv.writer(response)
        
        # Lägg till headers
        writer.writerow(['Company Name', 'Total Sent Emails', 'Total Replies', 'Interested Leads', 'Meetings Booked', 'Revenue', 'Commission Earned'])
        
        # Skriv företagets statistik till CSV-filen
        writer.writerow([
            company.name,
            company.total_sent_emails,
            company.total_replies,
            company.interested_leads,
            company.meetings_booked,
            company.revenue,
            company.commission_earned
        ])
        
        return response
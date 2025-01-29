# campaigns/tasks.py
from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta, datetime
from campaigns.models import Campaign
from email_list.models import EmailList
from django.conf import settings

def send_campaign_emails():
    # Hämta aktuell tid (Stockholmstid)
    current_time = timezone.localtime()
    current_weekday = current_time.weekday()

    # Kontrollera vilken veckodag det är och sätt rätt tidsram för att skicka e-post
    if current_weekday == 0:  # Måndag
        start_time = current_time.replace(hour=13, minute=0, second=0, microsecond=0)
        end_time = current_time.replace(hour=16, minute=0, second=0, microsecond=0)
    elif current_weekday in [1, 2, 3]:  # Tisdag till torsdag
        start_time_morning = current_time.replace(hour=8, minute=0, second=0, microsecond=0)
        end_time_morning = current_time.replace(hour=10, minute=0, second=0, microsecond=0)
        start_time_afternoon = current_time.replace(hour=13, minute=0, second=0, microsecond=0)
        end_time_afternoon = current_time.replace(hour=15, minute=0, second=0, microsecond=0)
    elif current_weekday == 4:  # Fredag
        start_time = current_time.replace(hour=6, minute=0, second=0, microsecond=0)
        end_time = current_time.replace(hour=10, minute=0, second=0, microsecond=0)
    else:
        return  # Om det är lördag eller söndag, gör ingenting.

    # Se till att tiden är inom rätt tidsfönster
    if not ((start_time <= current_time <= end_time) or
            (current_weekday in [1, 2, 3] and
             (start_time_morning <= current_time <= end_time_morning or
              start_time_afternoon <= current_time <= end_time_afternoon))):
        return

    # Hämta alla kampanjer och skicka e-post baserat på deras e-postlistor
    campaigns = Campaign.objects.all()
    for campaign in campaigns:
        email_list = EmailList.objects.filter(campaign=campaign)
        company = campaign.company

        # Kontrollera företagets dagliga gräns
        if company.sent_today >= company.daily_email_limit:
            continue

        # Skicka e-post till varje mottagare i listan
        for email_entry in email_list:
            if company.sent_today >= company.daily_email_limit:
                break  # Sluta om gränsen är nådd

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

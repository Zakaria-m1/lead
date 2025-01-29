# companies/models.py

from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=255)
    total_sent_emails = models.IntegerField(default=0)  # Totalt antal skickade e-postmeddelanden
    sent_today = models.IntegerField(default=0)  # Antal e-postmeddelanden skickade idag
    total_replies = models.IntegerField(default=0)  # Antal svar på e-post
    interested_leads = models.IntegerField(default=0)  # Antal leads som är intresserade
    meetings_booked = models.IntegerField(default=0)  # Antal bokade möten
    revenue = models.FloatField(default=0.0)  # Startar alltid på 0
    open_rate = models.FloatField(default=0.0)  # Öppningsfrekvens
    click_rate = models.FloatField(default=0.0)  # Klickfrekvens
    bounce_rate = models.FloatField(default=0.0)  # Studsfrekvens (misslyckade leveranser)
    unsubscribe_rate = models.FloatField(default=0.0)  # Avprenumerationsfrekvens
    commission_earned = models.FloatField(default=0.0)  # Provision genererad av kampanjer
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def update_company_statistics(self):
        """
        Dynamisk beräkning av statistik baserat på alla kampanjer och leads för detta företag.
        """
        campaigns = self.campaigns.all()  # Hämta alla kampanjer för företaget
        total_emails_sent = sum([campaign.total_sent for campaign in campaigns])
        total_opens = sum([campaign.open_rate * campaign.total_sent for campaign in campaigns])
        total_clicks = sum([campaign.click_rate * campaign.total_sent for campaign in campaigns])
        total_bounces = sum([campaign.bounce_rate * campaign.total_sent for campaign in campaigns])
        total_unsubscribes = sum([campaign.unsubscribe_rate * campaign.total_sent for campaign in campaigns])

        # Uppdatera företagets totala statistik
        self.total_sent_emails = total_emails_sent
        self.open_rate = total_opens / total_emails_sent if total_emails_sent > 0 else 0
        self.click_rate = total_clicks / total_emails_sent if total_emails_sent > 0 else 0
        self.bounce_rate = total_bounces / total_emails_sent if total_emails_sent > 0 else 0
        self.unsubscribe_rate = total_unsubscribes / total_emails_sent if total_emails_sent > 0 else 0

        # Beräkna svar, intresserade leads och möten från kampanjens leads
        total_replies = sum([campaign.leads.filter(status='contacted').count() for campaign in campaigns])
        interested_leads = sum([campaign.leads.filter(status='interested').count() for campaign in campaigns])
        meetings_booked = sum([campaign.leads.filter(status='meeting').count() for campaign in campaigns])

        self.total_replies = total_replies
        self.interested_leads = interested_leads
        self.meetings_booked = meetings_booked

        # Räkna upp intäkter och provision
        total_revenue = sum([campaign.revenue_generated for campaign in campaigns])
        self.revenue = total_revenue
        self.commission_earned = total_revenue * 0.10  # Exempel: 10% provision

        # Spara de uppdaterade statistikerna
        self.save()

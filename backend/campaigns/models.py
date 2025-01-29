# campaigns/models.py

from django.db import models
from django.contrib.auth.models import User
from companies.models import Company

# campaigns/models.py

class Campaign(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)  # Den användare som äger kampanjen (klient)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='campaigns', null=True)
    name = models.CharField(max_length=255)
    email_template = models.TextField()
    total_sent = models.IntegerField(default=0)  # Totalt antal skickade e-postmeddelanden
    sent_today = models.IntegerField(default=0)  # Antal skickade e-postmeddelanden idag
    open_rate = models.FloatField(default=0.0)
    click_rate = models.FloatField(default=0.0)
    bounce_rate = models.FloatField(default=0.0)
    unsubscribe_rate = models.FloatField(default=0.0)
    revenue_generated = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def total_emails(self):
        return self.email_list.count()

    @property
    def emails_left(self):
        return self.email_list.filter(sent=False).count()

    def __str__(self):
        return f'{self.name} - {self.company.name}'

# campaigns/models.py

from django.db import models
from django.core.exceptions import ValidationError
from campaigns.models import Campaign  # Ensure the correct import from your campaigns app

class EmailList(models.Model):
    campaign = models.ForeignKey(Campaign, related_name='email_list', on_delete=models.CASCADE)
    email = models.EmailField()  # Email address
    name = models.CharField(max_length=255)  # Company name
    categories = models.JSONField()  # Industry categories (JSON)
    city = models.CharField(max_length=255, null=True, blank=True)  # City or location
    has_website = models.BooleanField(default=False)  # Whether the company has a website
    sent = models.BooleanField(default=False)  # Whether the email has been sent

    class Meta:
        unique_together = ('campaign', 'email')  # Prevent duplicates within the same campaign

    def clean(self):
        # Ensure email is not duplicated within the same campaign
        if EmailList.objects.filter(campaign=self.campaign, email=self.email).exists():
            raise ValidationError(f"The email address {self.email} already exists in this campaign.")
    
    def __str__(self):
        return f"{self.name} ({self.email})"

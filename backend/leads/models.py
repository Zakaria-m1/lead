# leads/models.py

from django.db import models
from campaigns.models import Campaign

class Lead(models.Model):
    STATUS_CHOICES = [
        ('new', 'New'),
        ('contacted', 'Contacted'),
        ('interested', 'Interested'),
        ('meeting_scheduled', 'Meeting Scheduled'),
        ('converted', 'Converted'),
        ('disqualified', 'Disqualified'),
    ]
    
    campaign = models.ForeignKey(Campaign, related_name='leads', on_delete=models.CASCADE)
    email = models.EmailField()
    score = models.IntegerField(default=0)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='new')  # Lägg till fler statusalternativ
    responded = models.BooleanField(default=False)  # Fält för att markera om leaden har svarat
    interested = models.BooleanField(default=False)  # Markera om leaden är intresserad
    meeting_scheduled = models.BooleanField(default=False)  # Möte bokat
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.email} - {self.campaign.name}'

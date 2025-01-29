# campaigns/serializers.py

from rest_framework import serializers
from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
    total_emails = serializers.SerializerMethodField()
    emails_left = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = [
            'id',
            'name',
            'email_template',
            'total_sent',
            'open_rate',
            'click_rate',
            'revenue_generated',
            'company',
            'total_emails',  # Computed field for total emails
            'emails_left',  # Computed field for emails left to send
        ]

    def get_total_emails(self, obj):
        # Get total number of emails associated with the campaign
        return obj.email_list.count()

    def get_emails_left(self, obj):
        # Get number of emails that haven't been sent yet
        return obj.email_list.filter(sent=False).count()

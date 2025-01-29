# leads/serializers.py

from rest_framework import serializers
from .models import Lead

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lead
        fields = ['id', 'email', 'score', 'status', 'campaign', 'created_at', 'responded', 'interested', 'meeting_scheduled']

# leads/admin.py

from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ['email', 'score', 'status', 'campaign', 'created_at']
    search_fields = ['email', 'campaign__name']

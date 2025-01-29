from django.contrib import admin

# Register your models here.
# campaigns/admin.py

from .models import Campaign

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'total_sent', 'open_rate', 'click_rate', 'revenue_generated', 'created_at']
    search_fields = ['name', 'owner__username']

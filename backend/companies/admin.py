# companies/admin.py

from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'total_sent_emails', 'revenue', 'open_rate', 'click_rate', 'bounce_rate', 'unsubscribe_rate', 'commission_earned']
    readonly_fields = ['total_sent_emails', 'revenue', 'open_rate', 'click_rate', 'bounce_rate', 'unsubscribe_rate', 'commission_earned']

    # Lägg till en åtgärd för att uppdatera statistiken direkt i adminpanelen
    actions = ['update_statistics']

    def update_statistics(self, request, queryset):
        for company in queryset:
            company.update_company_statistics()
        self.message_user(request, "Statistiken har uppdaterats för de valda företagen.")

    update_statistics.short_description = "Uppdatera statistik för valda företag"

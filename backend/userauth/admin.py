# userauth/admin.py

from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'role']
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        if obj and obj.role == 'SuperAdmin':  # Om rollen är SuperAdmin, ta bort fältet 'companies'
            form.base_fields['companies'].required = False
        return form

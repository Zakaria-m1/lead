# userauth/models.py

from django.db import models
from django.contrib.auth.models import User
from companies.models import Company

class UserProfile(models.Model):
    USER_ROLES = [
        ('SuperAdmin', 'SuperAdmin'),
        ('Admin', 'Admin'),
        ('Client', 'Client'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=20, choices=USER_ROLES, default='Client')
    companies = models.ManyToManyField(Company, related_name='users', blank=True)  # Användaren kan vara kopplad till flera företag

    def __str__(self):
        return self.user.username
 
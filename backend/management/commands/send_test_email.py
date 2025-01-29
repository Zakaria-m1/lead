# backend/management/commands/send_test_email.py

from django.core.management.base import BaseCommand
from django.core.mail import send_mail

class Command(BaseCommand):
    help = 'Sends a test email to verify SMTP settings'

    def handle(self, *args, **kwargs):
        send_mail(
            'Test Email',  # Ämne
            'This is a test email to check SMTP configuration.',  # Meddelandetext
            'anton4@truevision.se',  # Avsändaradress
            ['truevision.se@gmail.com'],  # Mottagare (byt till din testadress)
            fail_silently=False,
        )
        self.stdout.write(self.style.SUCCESS('Successfully sent test email'))

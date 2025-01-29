from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from userauth.models import UserProfile

class Command(BaseCommand):
    help = 'Sets up demo data for the project'

    def handle(self, *args, **kwargs):
        # Create demo admin user
        demo_user, created = User.objects.get_or_create(
            username='demo_admin',
            email='admin@example.com',
            defaults={
                'is_staff': True,
                'is_superuser': True
            }
        )
        
        if created or not demo_user.check_password('demo123'):
            demo_user.set_password('demo123')
            demo_user.save()
            self.stdout.write(self.style.SUCCESS('Demo admin user created/updated'))

        # Create user profile
        profile, created = UserProfile.objects.get_or_create(
            user=demo_user,
            defaults={
                'role': 'SuperAdmin'
            }
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Demo user profile created'))

        self.stdout.write(self.style.SUCCESS('''
Demo setup complete!
You can now log in with:
Username: demo_admin
Password: demo123
''')) 
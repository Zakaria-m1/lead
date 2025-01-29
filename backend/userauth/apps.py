# userauth/apps.py
from django.apps import AppConfig

class UserauthConfig(AppConfig):
    name = 'userauth'

    def ready(self):
        import userauth.signals

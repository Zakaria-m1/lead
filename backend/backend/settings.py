# backend/settings.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# backend/settings.py

# Lägg till TEMPLATES-inställningen om den saknas
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # Här kan du lägga till eventuella egna mallvägar om du behöver
        'APP_DIRS': True,  # Sök i applikationsmappar efter mallar
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
ALLOWED_HOSTS = ['*']
DEBUG = True
# URL för statiska filer (CSS, JavaScript, bilder etc.)
STATIC_URL = '/static/'

# Valfritt: Du kan också ange var statiska filer ska samlas in när du kör `collectstatic`
STATICFILES_DIRS = [
    # Lägg till dina egna mappar med statiska filer här
]

# Den katalog där statiska filer ska lagras när de samlas in
STATIC_ROOT = 'staticfiles'  # Använd denna i produktion

ROOT_URLCONF = 'backend.urls'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',         # Django REST Framework
    'campaigns',              # Kampanjhantering
    'leads',                  # Lead-hantering
    'userauth',                   # Användarautentisering
    'companies',
    'email_list',
    'rest_framework_simplejwt',
    'corsheaders',
    "channels",
]

# REST Framework configuration
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
}

# Databas inställning (exempel för PostgreSQL)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

SECRET_KEY = '$5tmu3#zp@#!63jxa+wtl9mdn_9l68y705&12_1g8s29h^%ilo'

# backend/settings.py

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',  # Lägg till denna
    'corsheaders.middleware.CorsMiddleware',  # Lägg till denna rad
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',  # Lägg till denna
    'django.contrib.messages.middleware.MessageMiddleware',  # Lägg till denna
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://62.72.32.239:3000",
    "http://62.72.32.239:3001",
    "https://vendux.se",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Disable CSRF for development
CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'https://vendux.se',
    'https://www.vendux.se',
]

CSRF_COOKIE_SECURE = False  # Set to True in production
SESSION_COOKIE_SECURE = False  # Set to True in production

# backend/settings.py

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.hostinger.com'  # SMTP-servern du använder
EMAIL_PORT = 587  # SMTP-port (587 för TLS)
EMAIL_USE_TLS = True  # TLS ska vara på
EMAIL_HOST_USER = 'anton4@truevision.se'  # SMTP-användare
EMAIL_HOST_PASSWORD = 'SuperLemon.123'  # SMTP-lösenord
DEFAULT_FROM_EMAIL = 'anton4@truevision.se'  # Standardavsändaradress


from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),  # Increased for development
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}


ASGI_APPLICATION = 'backend.asgi.application'

# Channel layers configuration
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],  # Redis server för att hantera WebSocket-kanaler
        },
    },
}

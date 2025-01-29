from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/campaigns/$', consumers.CampaignConsumer.as_asgi()),  # Rutt för WebSocket
]

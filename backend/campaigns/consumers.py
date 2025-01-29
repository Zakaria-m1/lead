import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Campaign
from .serializers import CampaignSerializer

class CampaignConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'campaign_updates'
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)

        # Hantera action för att hämta kampanjer
        if 'action' in data and data['action'] == 'get_campaigns':
            # Hämta kampanjdata
            campaigns = Campaign.objects.all()
            serializer = CampaignSerializer(campaigns, many=True)
            await self.send(text_data=json.dumps({
                'action': 'get_campaigns',
                'campaigns': serializer.data
            }))
        elif 'message' in data:
            await self.channel_layer.group_send(
                self.group_name,
                {
                    'type': 'send_update',
                    'message': data['message']
                }
            )

    # Hantera uppdateringar
    async def send_update(self, event):
        message = event['message']
        await self.send(text_data=json.dumps({
            'message': message
        }))

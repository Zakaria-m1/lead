# leads/views.py

from rest_framework import generics
from .models import Lead
from .serializers import LeadSerializer
from rest_framework.response import Response
from rest_framework import status

class LeadList(generics.ListAPIView):
    serializer_class = LeadSerializer

    def get_queryset(self):
        user = self.request.user
        user_profile = user.userprofile

        if user_profile.role == 'SuperAdmin':
            return Lead.objects.all()  # SuperAdmin ser alla leads
        elif user_profile.role == 'Admin':
            # Admin ser endast leads för företag de har tillgång till
            return Lead.objects.filter(campaign__company__in=user_profile.companies.all())
        else:  # Client
            # Client ser endast sina egna kampanjer och leads
            return Lead.objects.filter(campaign__owner=user)

class LeadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

class LeadStatusUpdateView(generics.UpdateAPIView):
    """
    Uppdatera specifika fält som status, intresse, eller mötesbokning för en lead.
    """
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def patch(self, request, *args, **kwargs):
        lead = self.get_object()
        data = request.data

        # Uppdatera status om det finns
        lead.status = data.get('status', lead.status)
        lead.responded = data.get('responded', lead.responded)
        lead.interested = data.get('interested', lead.interested)
        lead.meeting_scheduled = data.get('meeting_scheduled', lead.meeting_scheduled)

        lead.save()
        return Response(LeadSerializer(lead).data, status=status.HTTP_200_OK)

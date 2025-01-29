# leads/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.LeadList.as_view(), name='lead-list'),
    path('<int:pk>/', views.LeadDetail.as_view(), name='lead-detail'),
    path('<int:pk>/status/', views.LeadStatusUpdateView.as_view(), name='lead-status-update'),  # Ny endpoint för att uppdatera lead status
]

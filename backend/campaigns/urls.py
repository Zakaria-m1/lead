# campaigns/urls.py

from django.urls import path
from . import views
from .views import EmailListUploadView

urlpatterns = [
    path('', views.CampaignList.as_view(), name='campaign-list'),
    path('<int:pk>/', views.CampaignDetail.as_view(), name='campaign-detail'),
    path('<int:campaign_id>/upload-email-list/', EmailListUploadView.as_view(), name='upload-email-list'),
]

# companies/urls.py

from django.urls import path
from .views import CompanyStatisticsView, CompanyStatisticsExportView

urlpatterns = [
    path('statistics/<int:company_id>/', CompanyStatisticsView.as_view(), name='company-statistics'),
    path('export/<int:company_id>/', CompanyStatisticsExportView.as_view(), name='company-statistics-export'),
]

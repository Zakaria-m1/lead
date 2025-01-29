# userauth/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import UntypedToken
from .models import UserProfile

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password'])
            )
            user.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            companies = user_profile.companies.all()
            company_data = [{"id": company.id, "name": company.name} for company in companies]
            
            return Response({
                "message": "Token is valid", 
                "username": request.user.username,
                "email": request.user.email,  # Include email
                "role": user_profile.role,
                "companies": company_data,  # List of companies
            }, status=status.HTTP_200_OK)
        except UserProfile.DoesNotExist:
            return Response({"message": "User profile not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_403_FORBIDDEN)

class VerifyUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'is_authenticated': True
        }, status=status.HTTP_200_OK)
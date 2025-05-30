from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from portal.models import Teacher
from django.core.mail import send_mail
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.utils.crypto import get_random_string
from django.shortcuts import render, redirect
from django.contrib import messages


class TeacherLoginView(APIView):
    def get(self, request):

        if request.user.is_authenticated:
            return redirect('home')
        
        return render(request, 'auth/login.html') 

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Invalid username or password.')
            return redirect('login')


@method_decorator(login_required, name='dispatch')
class TeacherLogoutView(APIView):
    def post(self, request):
        logout(request)
        return redirect('login')
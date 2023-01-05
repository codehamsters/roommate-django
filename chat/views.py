from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Room

# Create your views here.

def home(request):
    rooms=Room.objects.all()
    return render(request, 'main.html', {'rooms': rooms})

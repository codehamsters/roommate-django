from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# Create your views here.

def home(request):
    return render(request, 'main.html')

def new(request):
    pass

def room(request, room):
    pass

def checkview(request):
    pass
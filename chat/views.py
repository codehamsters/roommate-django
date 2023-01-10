from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User, auth
from .models import Room

# Create your views here.

def home(request): #restricts user to login or register if not already
    if not User.is_authenticated:
        return redirect('/auth')
    rooms=reversed(Room.objects.all())
    return render(request, 'main.html', {'rooms': rooms})

def create(request): #creates room
    import re
    room=request.POST["room-name-input"]
    room=room.replace("/",'//')
    allowed= r'^[_.- A-Z0-9a-z]*$'
    if re.match(allowed, room)==None or len(room)>25:
        return redirect('/')
    else:
        if Room.objects.filter(name=room).exists():
            return redirect('/')
        else:
            new_room=Room.objects.create(name=room)
            new_room.save()
            return redirect('/')
        
def register(request): #register user
    if request.method=='POST':
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        
        if User.objects.filter(email=email).exists():
            messages.info(request, 'E-Mail Already Exists')
            return redirect('auth')
        elif User.objects.filter(username=username).exists():
            messages.info(request, "Username Already in Use")
        else:
            user=User.objects.create_user(username=username, email=email, password=password)
            user.save()
            auth.login(request,user)
    else:
        return render (request, 'auth.html')
    pass
        
def login(request): #login user
    if request.method=='POST':
        email=request.POST['email']
        password=request.POST['password']
        
        user=auth.authentication(email=email, password=password)
        
        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.info(request ,'Credentials Invalid')
            return redirect('auth')
    else:
        return render(request, 'auth.html')
        
def auth(request): #restricts user if already logged in
    if User.is_authenticated:
        return redirect('/')
    return render(request, 'auth.html')

def logout(request): #logout user
    auth.logout(request)
    return redirect('auth')
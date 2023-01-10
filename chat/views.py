from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User, auth
from .models import Room

# Create your views here.

def home(request): #restricts user to login or register if not already
    user=request.user
    if user.is_authenticated:
        rooms=reversed(Room.objects.all())
        return render(request, 'main.html', {'rooms': rooms})
    return redirect('auth')

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
            messages.error(request, 'E-Mail Already Exists')
            return redirect('auth')
        elif User.objects.filter(username=username).exists():
            messages.error(request, "Username Already in Use")
            return redirect('auth')
        else:
            user=User.objects.create_user(username=username, email=email, password=password)
            user.save()
            auth.login(request,user)
            return redirect('/')
    else:
        return render (request, 'auth.html')
        
def login(request): #login user
    if request.method=='POST':
        username=request.POST['username']
        password=request.POST['password']
        
        user=auth.authenticate(username=username, password=password)
        
        if user is not None:
            auth.login(request, user)
            return redirect('/')
        else:
            messages.warning(request ,'Invalid username or password.')
            return redirect('auth')
    else:
        return render(request, 'auth.html')
        
def authentication(request): #restricts user if already logged in
    user=request.user
    if user.is_authenticated:
        return redirect('/')
    return render(request, 'auth.html')

def logout(request): #logout user
    auth.logout(request)
    return redirect('auth')
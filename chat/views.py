from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User, auth
from django.contrib.auth import get_user_model
from .models import Room,Message

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
            return redirect('/'+room+"/")
        
def register(request): #register user
    if request.method=='POST':
        username=request.POST['username']
        email=request.POST['email']
        password=request.POST['password']
        if not username or not email:
            return render(request, 'auth.html')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, 'E-Mail Already Exists')
            return redirect('auth')
        if User.objects.filter(username=username).exists(): 
            return HttpResponse('<div style="color: red">This Username already exists</div>')
            # messages.error(request, "Username Already in Use")
            # return redirect('auth')
        else:
            user=User.objects.create_user(username=username, email=email, password=password)
            user.save()
            auth.login(request,user)
            return redirect('/')
    else:
        return render (request, 'auth.html')
        
def login(request): #login user
    if request.method=='POST':
        username=request.POST['logusername']
        password=request.POST['logpassword']
        
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
    if request.method=='POST':
        username=request.POST['username']
        email=request.POST['email']
        if get_user_model().objects.filter(username=username).exists:
            return HttpResponse('<div style="color: red">Username already in use</div>')
        if get_user_model().objects.filter(email=email).exists:
            return HttpResponse('<div style="color: red">E-Mail already in use</div>')
    if user.is_authenticated:
        return redirect('/')
    return render(request, 'auth.html')

def logout(request): #logout user
    auth.logout(request)
    return redirect('auth')

def check_username(request):
    if request.method=='POST':
        username=request.POST['username']
        if not username:
            HttpResponse()
        if User.objects.filter(username=username).exists():
            return HttpResponse('<div style="color: red">Username already in use</div>')
        else:
            return HttpResponse()


def check_email(request):
    if request.method=='POST':
        email=request.POST['email']
        if not email:
            return HttpResponse()
        elif get_user_model().objects.filter(email=email).exists():
            return HttpResponse('<div style="color: red">E-Mail already in use</div>')
        else:
            return HttpResponse()

def room(request,room1):
    rooms=reversed(Room.objects.all())
    room_details=Room.objects.get(name=room1)
    return render(request , 'main.html', {
        'room_details':room_details,
        'rooms':rooms,
        'room1':room1
    })

def send(request):
    message=request.POST["message-input"]
    # username=request.POST['username']
    room_id=request.POST['room_id']
    
    # new_message=Message.objects.create(value=message, user=username, room= room_id)
    new_message=Message.objects.create(value=message, room= room_id)
    new_message.save()
    return HttpResponse('Message sent successfully')

def getMessages(request, room1):
    room_details=Room.objects.get(name=room1)
    messages=Message.objects.filter(room=room_details.id)
    return JsonResponse({"messages":list(messages.values())})

def checkview(request):
    room1=request.POST['open-room-id']
    # if room1 not in request.POST:
    #     return redirect('/')
    # print(request.build_absolute_uri())
    return redirect('/'+room1)
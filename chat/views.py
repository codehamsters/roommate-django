from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from .models import Room

# Create your views here.

def home(request):
    rooms=reversed(Room.objects.all())
    return render(request, 'main.html', {'rooms': rooms})
def create(request):
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

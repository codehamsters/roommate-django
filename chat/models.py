from django.db import models
from datetime import datetime
# Create your models here.
class Room(models.Model):
    name=models.CharField(max_length=15)
    time=models.TimeField(default=datetime.now, blank=True)
class Name(models.Model):
    name=models.CharField(max_length=100)
class Message(models.Model):
    value=models.CharField(max_length=1000000)
    date=models.DateTimeField(default=datetime.now, blank=True)
    user=models.CharField(max_length=1000000)
    room=models.CharField(max_length=1000000)
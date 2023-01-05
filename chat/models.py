from django.db import models
from datetime import datetime
# Create your models here.
class Room(models.Model):
    name=models.CharField(max_length=15)
    time=models.TimeField(default=datetime.now, blank=True)
class Name(models.Model):
    name=models.CharField(max_length=100)
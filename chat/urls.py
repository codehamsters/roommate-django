from django.urls import path
from . import views

urlpatterns = [
    path('',views.home,name='home'),
    path('create',views.create, name='create'),
    path('auth', views.authentication, name='auth'),
    path('register', views.register, name='register'),
    path('login', views.login, name='login'),
    path('logout', views.logout, name='logout'),
    
]

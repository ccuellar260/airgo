from django.urls import path
from . import views

urlpatterns = [
    path('', views.vuelos_index, name='vuelos_index')
]

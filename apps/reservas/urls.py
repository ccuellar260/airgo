from django.urls import path
from . import views

urlpatterns = [
    path('Inicio/', views.reserva_inicio, name='reserva_inicio'),
]

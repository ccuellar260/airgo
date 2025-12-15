from django.shortcuts import render

# Create your views here.
def reserva_inicio(request):
    return render(request, 'reservas/reserva_inicio.html')
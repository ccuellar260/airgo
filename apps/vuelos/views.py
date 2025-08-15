from django.shortcuts import render

def vuelos_index(request):
    # Logic to retrieve and display products
    return render(request, 'vuelos/vuelo_index.html')


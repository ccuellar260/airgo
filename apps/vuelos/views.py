from django.shortcuts import render

def vuelos_index(request):
    
    vuelos = [
            {
            "ciudad": "Cochabamba",
            "pais": "BOLIVIA",
            "codigo": "CBB",
            "nombre_aeropuerto": "Aeropuerto Internacional Jorge Wilstermann",
            "icono": "✈️"
        },
        {
            "ciudad": "La Paz",
            "pais": "BOLIVIA",
            "codigo": "LPB",
            "nombre_aeropuerto": "Aeropuerto Internacional El Alto",
            "icono": "✈️"
        },
        {
            "ciudad": "Santa Cruz",
            "pais": "BOLIVIA",
            "codigo": "VVI",
            "nombre_aeropuerto": "Aeropuerto Internacional Viru Viru",
            "icono": "✈️"
        },
        {
            "ciudad": "Sucre",
            "pais": "BOLIVIA",
            "codigo": "SRE",
            "nombre_aeropuerto": "Aeropuerto Internacional Alcantarí",
            "icono": "✈️"
        },
        {
            "ciudad": "Tarija",
            "pais": "BOLIVIA",
            "codigo": "TJA",
            "nombre_aeropuerto": "Aeropuerto Capitán Oriel Lea Plaza",
            "icono": "✈️"
        }
    ]    
    
    return render(request, 'vuelos/vuelo_index.html', {
        'vuelos': vuelos
    })


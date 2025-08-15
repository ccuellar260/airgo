from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('vuelos/', include('apps.vuelos.urls'), name='vuelos'),
    # redireccoin a vuelos 
    path('', include('apps.vuelos.urls')),
]

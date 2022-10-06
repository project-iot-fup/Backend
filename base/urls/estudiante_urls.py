from django.urls import path
from base.views import estudiante_views as views

urlpatterns = [

    path('', views.getEstudiantes, name="estudiantes"),
    path('create/', views.createEstudiante, name="estudiante-create"),

]

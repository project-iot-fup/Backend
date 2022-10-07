from django.urls import path
from base.views import estudiante_views as views

urlpatterns = [

    path('', views.getEstudiantes, name="estudiantes"),
    path('create/', views.createEstudiante, name="estudiante-create"),
    path('<str:pk>/', views.getEstudiante, name="estudiante"),
    path('update/<str:pk>/', views.updateEstudiante, name="estudiante-update"),
    path('delete/<str:pk>/', views.deleteEstudiante, name="estudiante-delete"),
]

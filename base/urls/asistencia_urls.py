from django.urls import path
from base.views import asistencia_views as views


urlpatterns = [
    path('', views.getAsistencias, name="all-asistencias"),
    path('<str:pk>/', views.getAsistencia, name="asistencia"),
]

from django.urls import path
from base.views import asistencia_views as views


urlpatterns = [
    path('<str:pk>/', views.getAsistencia, name="asistencia"),
]

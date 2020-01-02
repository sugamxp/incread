from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('get', views.get_articles, name='get_articles'),
    path('change_priority', views.change_priority, name='change_priority'),
    path('', include(router.urls))
]
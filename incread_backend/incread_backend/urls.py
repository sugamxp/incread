from django.contrib import admin
from django.urls import path, include
from articles import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('articles/', include('articles.urls')),
    path('users/', include('users.urls')),
]

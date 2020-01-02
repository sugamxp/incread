from django.urls import path, include
from . import views
from rest_framework import routers
from .views import UserArticleViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('', UserViewSet)
router.register('userArticle', UserArticleViewSet)

urlpatterns = [
    path('', include(router.urls))
]
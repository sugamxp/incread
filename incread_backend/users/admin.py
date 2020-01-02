from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserArticle, UserAction

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ['email', 'username','country', 'access_token', 'status']

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register([UserArticle, UserAction])
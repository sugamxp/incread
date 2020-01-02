from django.contrib import admin
from .models import Article, Publisher

admin.site.register([Article, Publisher])
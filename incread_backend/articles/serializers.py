from rest_framework import serializers
from .models import Article


class ArticlesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ('id', 'title', 'excerpt','time_to_read')

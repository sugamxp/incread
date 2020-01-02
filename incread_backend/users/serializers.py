from rest_framework import serializers
from .models import UserArticle, CustomUser

class UserArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserArticle
        fields = ('id', 'user_fk', 'article_fk')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username')
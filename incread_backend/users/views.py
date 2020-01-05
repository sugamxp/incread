from django.shortcuts import render
from datetime import datetime
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserArticle,CustomUser
from .serializers import UserArticleSerializer,UserSerializer

class UserArticleViewSet(viewsets.ModelViewSet):
    queryset = UserArticle.objects.all()
    serializer_class = UserArticleSerializer

    @action(detail=True, methods=['POST'])
    def set_priority(self, request, pk=None):
        if 'priority' in request.data:
            
            priority = request.data['priority']
            user_article = UserArticle.objects.get(id=pk)
            user_article.priority = int(priority)
            user_article.save()
            print(user_article.priority)
            response = {'message': 'Success', 'id': pk}
            return Response(response, status=status.HTTP_200_OK)
        
        else :
            response = {'message':'Failure - Priority not provided'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['GET'])
    def stats(self, request,pk=None):
        user = CustomUser.objects.filter(id=pk)[0]
        user_articles = UserArticle.objects.filter(user_fk = user)
        no_of_articles = len(user_articles)
        unique_publishers = len(set(user_articles.values_list('publisher_fk')))
        print(unique_publishers)
        response = {'message':'Success','no_of_articles': no_of_articles, 'unique_publishers': unique_publishers}
        return Response(response, status=status.HTTP_200_OK)
        
    @action(detail=True, methods=['GET'])
    def tag_articles(self, request, pk=None):
        user = CustomUser.objects.filter(id=pk)[0]
        user_articles = UserArticle.objects.filter(user_fk = user).filter(article_fk__time_to_read__isnull = False).filter(priority__isnull=True).order_by('article_fk__time_to_read', '-time_added_pocket')[:7]

        # .select_related('article_fk').order_by('article_fk__time_to_read', 'time_added_pocket')
        response = []
        for i,user_article in enumerate(user_articles):

            data = {'id':user_article.id,
                    'title':user_article.article_fk.title,
                    'excerpt': user_article.article_fk.excerpt,
                    'time_to_read' : user_article.article_fk.time_to_read,
                    'publisher': user_article.publisher_fk.url,
                    'time_added_pocket':  datetime.fromtimestamp(user_article.time_added_pocket)}

            response.append(data)
            

        
        # response = {'message':'Success'}
        return Response(response, status=status.HTTP_200_OK)

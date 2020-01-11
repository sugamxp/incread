from django.shortcuts import render
from datetime import datetime
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import UserArticle,CustomUser
from .serializers import UserArticleSerializer,UserSerializer
import requests
from .models import UserArticle
from articles.models import Article, Publisher
import tldextract
from rest_framework import viewsets, status as http_status

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
        user_articles = UserArticle.objects.filter(user_fk = user).filter(article_fk__time_to_read__isnull = False).filter(priority__isnull=True).order_by('-time_added_pocket')[:7]

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

    @action(detail=True, methods=['GET'])
    def get_latest_articles(self, request,pk=None):
        user = CustomUser.objects.filter(id=pk)[0]
        access_token = user.access_token
        last_user_article = UserArticle.objects.filter(user_fk = user).order_by('-time_added_pocket')[0]
        last_timestamp = last_user_article.time_added_pocket
        print(last_timestamp)
        url = f'https://getpocket.com/v3/get?consumer_key=85449-9131725c86119d6dca1cbd8a&access_token={access_token}&\
                 detailType=detailed&state=unread&sort=newest&since={last_timestamp}'

        res = requests.get(url).json()
        articles = res['list']

        for i, article_id in enumerate(articles):
            article = articles[article_id]
            print(article_id)

            #Publisher Model
            title = article.get('domain_metadata',{}).get('name')
            logo = article.get('domain_metadata',{}).get('logo')
            publisher_url = tldextract.extract(article.get('resolved_url')).registered_domain

            publisher, status =  Publisher.objects.get_or_create(title=title, url=publisher_url, logo=logo)
            print("P =>",status)

            #Article Model
            url = article.get('resolved_url')
            title = article.get('resolved_title')
            excerpt = article.get('excerpt')
            is_article = True if article.get('is_article')=="1" else False
            has_video = True if article.get('has_video')=="1" else False
            has_image = True if article.get('has_image')=="1" else False
            word_count = article.get('word_count')
            lang = article.get('lang')
            time_to_read = article.get('time_to_read')
            top_image_url = article.get('top_image_url')
            listen_duration_estimate = article.get('listen_duration_estimate')

            curr_article,status  = Article.objects.get_or_create(item_id=article_id, 
                                        url=url, 
                                        title=title, 
                                        excerpt=excerpt,
                                        is_article=is_article, 
                                        has_video=has_video, 
                                        has_image=has_image, 
                                        word_count=word_count, 
                                        lang=lang, 
                                        time_to_read=time_to_read,
                                        top_image_url=top_image_url, 
                                        listen_duration_estimate=listen_duration_estimate, 
                                        publisher_fk=publisher)
            print("A =>", status)

            #User Article
            time_added_pocket = int(article.get('time_added', '0'))
            time_updated_pocket =  int(article.get('time_updated', '0'))
            time_read_pocket =  int(article.get('time_read','0'))
            time_favorited_pocket =   int(article.get('time_favorited','0'))
            status = int(article.get('status','0'))
            UserArticle.objects.get_or_create(user_fk=user, 
                                            article_fk=curr_article, 
                                            publisher_fk = publisher,
                                            time_added_pocket=time_added_pocket,
                                            time_updated_pocket = time_updated_pocket,
                                            time_read_pocket = time_read_pocket,
                                            time_favorited_pocket =time_favorited_pocket,
                                            status=status)

        response = {'message' :'Success'}
        return Response(response, status=http_status.HTTP_200_OK)


    @action(detail=True, methods=['POST'])
    def update_incread(self, request, pk=None):
        user = CustomUser.objects.get(id=pk)
        access_token = user.access_token
        
        user_articles = UserArticle.objects.filter(user_fk = user)
        
        articles_db = set()
        for user_article in user_articles:
            articles_db.add(user_article.getItemId())

        url = f'https://getpocket.com/v3/get?consumer_key=85449-9131725c86119d6dca1cbd8a&access_token={access_token}&\
                 detailType=detailed&state=unread&sort=newest'

        res = requests.get(url).json()
        articles = res['list']
        
        articles_pocket = set()
        for i, article_id in enumerate(articles):
            articles_pocket.add(int(article_id))
        
        articles_not_done = articles_db & articles_pocket
        articles_done = articles_db - articles_pocket
        
        for id in articles_not_done:
            print(id)
            ua = user_articles.filter(article_fk__item_id=id)
            for user_article in ua:
                user_article.read_status = 'NOT DONE'
                user_article.save()

        for id in articles_done:
            ua = user_articles.filter(article_fk__item_id=id)
            for user_article in ua:
                user_article.read_status = 'DONE'
                user_article.save()

        response = {'message' :'Success'}
        return Response(response, status=http_status.HTTP_200_OK)






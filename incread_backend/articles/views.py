from django.shortcuts import render
from django.http import HttpResponse
import requests
import os
from .models import Article, Publisher
import tldextract
from users.models import CustomUser, UserArticle
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import ArticlesSerializer


# MVC views - Removing Later
def index(request):
    articles = Article.objects.order_by('id')[:7]
    return render(request, 'articles/index.html', {'articles': articles})

def get_articles(request):

    # UserArticle.objects.all().delete()
    # Article.objects.all().delete()
    # Publisher.objects.all().delete()

    user = CustomUser.objects.filter(username = 'sugamxp')

    url = 'https://getpocket.com/v3/get?\
        consumer_key=85449-9131725c86119d6dca1cbd8a&\
        access_token=f48d8868-2452-5443-ec5d-976875&\
        detailType=detailed&state=unread&sort=newest'

    response = requests.get(url).json()
    articles = response['list']

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
        UserArticle.objects.get_or_create(user_fk=user[0], 
                                        article_fk=curr_article, 
                                        publisher_fk = publisher,
                                        time_added_pocket=time_added_pocket,
                                        time_updated_pocket = time_updated_pocket,
                                        time_read_pocket = time_read_pocket,
                                        time_favorited_pocket =time_favorited_pocket,
                                        status=status)


    return HttpResponse('Success')


def change_priority(request):
    if request.method == 'POST':
        user = CustomUser.objects.filter(username = 'sugamxp')[0]
        priority = request.POST['priority']
        item_id = int(request.POST['art_item_id'])
        article = Article.objects.filter(item_id=item_id).first()
        UserArticle.objects.filter(user_fk=user, article_fk=article).update(priority = priority)
        return HttpResponse('success')


#API ViewSets 
class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticlesSerializer


from .models import UserArticle,CustomUser
import collections
from datetime import datetime


def get_impact_score(effort, articles):
    impact_matrix = [[30,55,75,90,100],
                    [5,35,60,80,95],
                    [0,15,40,65,85],
                    [0,0,20,45,70],
                    [0,0,0,25,50]]

    for article_id in articles:
        priority = articles[article_id]
        articles[article_id] = impact_matrix[effort][priority-1]

    print(articles)
    return articles

def get_prioritize_articles_list(cnt, user_articles, user):
    time_to_read = {}
    for ua in user_articles:
        if ua.article_fk.time_to_read in time_to_read:
            time_to_read[ua.article_fk.time_to_read].update({ua.id : ua.priority})
        else:
            time_to_read[ua.article_fk.time_to_read] = {ua.id : ua.priority}
        
    time_to_read = collections.OrderedDict(sorted(time_to_read.items()))
    unique_time_to_read = list(time_to_read)

    for i,ttr in enumerate(unique_time_to_read):
        if i<=3:
            time_to_read[ttr] = get_impact_score(i, time_to_read[ttr])
        else:
            time_to_read[ttr] = get_impact_score(4, time_to_read[ttr])
    

    prioritized_list = {}
    for ttr in time_to_read:
        prioritized_list.update(time_to_read[ttr])

    prioritized_list = collections.OrderedDict({k: v for k, v in sorted(prioritized_list.items(), key=lambda item : (-item[1],-item[0]))})
    
    print("Prioritized List", prioritized_list)

    response = []
    ids = []
    for i,article_id in enumerate(prioritized_list):
        if i==cnt:
            break
        user_article = UserArticle.objects.filter(user_fk = user).get(article_fk=article_id)

        data = {'id':user_article.id,
                'title':user_article.article_fk.title,
                'excerpt': user_article.article_fk.excerpt,
                'time_to_read' : user_article.article_fk.time_to_read,
                'publisher': user_article.publisher_fk.url,
                'time_added_pocket':  datetime.fromtimestamp(user_article.time_added_pocket)}
        ids.append(user_article.id)
        response.append(data)

    return response, ids
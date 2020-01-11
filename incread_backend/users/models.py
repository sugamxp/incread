from django.contrib.auth.models import AbstractUser
from django.db import models
from articles.models import Article, Publisher
from jsonfield import JSONField
from django.core.validators import MaxValueValidator, MinValueValidator


class CustomUser(AbstractUser):
    country = models.CharField(max_length=100)
    access_token = models.CharField(max_length=255)
    status = models.CharField(max_length=100)

    def __str__(self):
        return self.username


class UserArticle(models.Model):
    user_fk = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    article_fk = models.ForeignKey(Article, on_delete=models.CASCADE)
    publisher_fk = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    time_added_pocket = models.IntegerField()
    time_updated_pocket = models.IntegerField()
    time_read_pocket = models.IntegerField()
    time_favorited_pocket =  models.IntegerField()
    priority = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)], null=True)

    # status - 0, 1, 2 - 1 if the item is archived - 2 if the item should be deleted
    status = models.IntegerField()
    read_status = models.CharField(max_length=255, default='DONE')
    
    def __str__(self):
        return self.article_fk.title

    def getItemId(self):
        return self.article_fk.item_id

class UserAction(models.Model):
    user_fk = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    article_fk = models.ForeignKey(Article, on_delete=models.CASCADE)
    user_article_fk = models.ForeignKey(UserArticle, on_delete=models.CASCADE)
    metadata = JSONField()

class Action(models.Model):
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=8, null=True)

    def __str__(self):
        return self.title
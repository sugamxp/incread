from django.db import models

# Create your models here.

class Publisher(models.Model):

    title = models.CharField(max_length=250, null=True)
    url = models.CharField(max_length=250, null=True)
    logo = models.CharField(max_length=250, null=True)

    def __str__(self):
        return self.url

class Article(models.Model):
    item_id = models.BigIntegerField()
    url = models.CharField(max_length=1000)
    title = models.CharField(max_length=250)
    excerpt = models.CharField(max_length=5000, null=True)
    is_article = models.BooleanField()
    has_video = models.BooleanField()
    has_image = models.BooleanField()
    word_count = models.CharField(max_length=8, null=True)
    lang = models.CharField(max_length=3)
    time_to_read = models.IntegerField(null=True)
    top_image_url = models.CharField(max_length=500, default='https://ph-files.imgix.net/a3fc2bb8-9245-4f1b-b9c5-ba5888caad86', null=True)
    listen_duration_estimate = models.IntegerField(null=True)
    publisher_fk = models.ForeignKey(Publisher, on_delete=models.SET_NULL, null=True)

    
    def __str__(self):
        return self.title

class Sourcer(models.Model):
    title = models.CharField(max_length=255)
    status = models.CharField(max_length=8, null=True)

    def __str__(self):
        return self.title

from django.test import TestCase
from .models import Tweet
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()
class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='cfe', password='somepassword')
        # User.objects.create_user(username='abc', password = 'somepassword')
        # User.objects.create_user(username='cfe', password = 'somepassword')


    # def test_user_created(self):
    #     # user = User.objects.get(username="cfe")
    #     self.assertEqual(self.user.username, "cfe")
    #     self.assertEqual(1,2)

    def test_tweet_created(self):
        tweet_obj = Tweet.objects.create(content='my tweet', user=self.user)
        self.assertEqual(tweet_obj.id, 1)
        self.assertEqual(tweet_obj.user, self.user)

    def test_api_login(self):
        client = APIClient()
        client.login(username=self.user.username,password='somepassword')
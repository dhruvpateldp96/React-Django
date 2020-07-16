from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
import random
# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request,"tweets/home.html", context = {},status = 200)

def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    tweets_list = [{ "id": x.id, "content": x.content, "likes":random.randint(0,3)} for x in qs]
    data = {
        "response": tweets_list
    }
    return JsonResponse(data)

def tweet_detail_view(request,tweet_id,*args,**kwargs):
    try:
        obj= Tweet.objects.get(id = tweet_id)
    except:
        raise Http404
    return HttpResponse(f"<h1>Hello {tweet_id} - {obj.content}</h1>")

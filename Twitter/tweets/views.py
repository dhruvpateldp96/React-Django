from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseRedirect
from .models import Tweet
from .forms import TweetForm
from django.utils.http import is_safe_url
from .serializers import TweetSerializer, TweetActionSerializer, TweetCreateSerializer
import random
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

# Create your views here.
def home_view(request, *args, **kwargs):
    return render(request,"tweets/home.html", context = {},status = 200)

# def tweet_list_view(request, *args, **kwargs):
#     qs = Tweet.objects.all()
#     tweets_list = [{ "id": x.id, "content": x.content, "likes":random.randint(0,3)} for x in qs]
#     data = {
#         "response": tweets_list
#     }
#     return JsonResponse(data)

# def tweet_detail_view(request,tweet_id,*args,**kwargs):
#     try:
#         obj= Tweet.objects.get(id = tweet_id)
#     except:
#         raise Http404
#     return HttpResponse(f"<h1>Hello {tweet_id} - {obj.content}</h1>")

# def tweet_create_view(request,*args,**kwargs):
#     form = TweetForm(request.POST or None)
#     next_url = request.POST.get('next') or None
#     if form.is_valid():
#         obj = form.save(commit=False)
#         obj.save()
#         if next_url != None:
#             return redirect(next_url)
#         form= TweetForm() 
#     if form.errors:
#         return JsonResponse(form.errors, status=400)
#     return render(request, 'components/forms.html', context = {"form":form})
# @authentication_classes([SessionAuthentication]) 

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_create_view(request,*args,**kwargs):
    serializer = TweetCreateSerializer(data = request.data)

    print("------------------------------------------------------------------------------------",serializer)
    print(serializer)
    # next_url = request.POST.get('next') or None
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)

        # print("nigger.....................................................>>",obj)
        # if next_url != None:
        #     return redirect(next_url)
        # # return 
    
    return Response({},status=400)

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    username = request.GET.get('username')
    if username != None:
        qs = qs.filter(user__username__iexact=username)
    serializers = TweetSerializer(qs, many=True)
    # print("list view", serializers.data)
    # print("-------------------------------------------------------------------------------------------------------------------------")
    return Response(serializers.data)



@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({},status=404)
    # obj = qs.first()
    serializers = TweetSerializer(qs, many=True)
    # print(serializers.data)
    return Response(serializers.data)


@api_view(['DELETE','POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({},status=404)
    # obj = qs.first()
    qs = qs.filter(user=request.user)
    if not qs.exists():
        return Response({'message':'cant delete'},status=401)
    obj = qs.first()
    obj.delete()
    return Response({'meesage':'tweet removed'}, status=200)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def tweet_action_view(request, *args, **kwargs):
    '''
    id is required.
    Action options are: like, unlike, retweet
    '''
    serializer = TweetActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        qs = Tweet.objects.filter(id=tweet_id)
        if not qs.exists():
            return Response({}, status=404)
        obj = qs.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            new_tweet = Tweet.objects.create(
                    user=request.user, 
                    parent=obj,
                    content=content,
                    )
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)
    return Response({}, status=200)



def local_tweets_list_view(request, *args, **kwargs):
    return render(request, "tweets/list.html")

def local_tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context = {'tweet_id':tweet_id})
    

def local_tweets_profile_view(request, username, *args,**kwargs):
    return render(request, "tweets/profile.html", context = {'profile_username':username})

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def tweet_action_view(request, *args, **kwargs):
#     '''
#     Actions are like unlike and retweet
#     id is required
#     '''

#     serializer = TweetActionSerializer(data= request.data)
#     if serializer.is_valid(raise_exception=True):
#         data = serializer.validated_data
#         tweet_id = data.get("id")
#         action = data.get("action")
#         qs = Tweet.objects.filter(id = tweet_id)
#         content = data.get("content")
#         if not qs.exists():
#             return Response({},status=404)
#         # obj = qs.first()

#         obj = qs.first()
#         print(obj.likes)
#         print(request.user)
#         if action == "like":
#             obj.likes.add(request.user)
#             serializer = TweetSerializer(obj)
#             return Response(serializer.data, status=200)
#         elif action == "unlike":
#             obj.likes.remove(request.user)
#         elif action == "retweet":
#             parent_obj = obj
#             new_tweet = Tweet.objects.create(user= request.user,parent=parent_obj, content = content)
#             serializer = TweetActionSerializer(new_tweet)
#             return Response({},status=200)
#             # pass
#         # if request.user in obj.likes.all():
#         #     obj.like.remove(request.user)
#         # else:
#         #     obj.like.add(request.user)
#     return Response({'meesage':'Like added'}, status=200)



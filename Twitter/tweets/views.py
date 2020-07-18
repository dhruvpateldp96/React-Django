from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse, HttpResponseRedirect
from .models import Tweet
from .forms import TweetForm
from django.utils.http import is_safe_url
from .serializers import TweetSerializer
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

@api_view(['POST'])
# @authentication_classes([SessionAuthentication]) 
@permission_classes([IsAuthenticated])
def tweet_create_view(request,*args,**kwargs):
    serializer = TweetSerializer(data = request.POST)
    # print("------------------------------------------------------------------------------------",serializer)
    next_url = request.POST.get('next') or None
    if serializer.is_valid(raise_exception=True):
        serializer.save(user=request.user)
        Response(serializer.data, status=201)

        # print("nigger.....................................................>>",obj)
        if next_url != None:
            return redirect(next_url)
        # return 
    return Response({},status=400)

@api_view(['GET'])
def tweet_list_view(request, *args, **kwargs):
    qs = Tweet.objects.all()
    serializers = TweetSerializer(qs, many=True)
    return Response(serializers.data)



@api_view(['GET'])
def tweet_detail_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({},status=404)
    # obj = qs.first()
    serializers = TweetSerializer(qs, many=True)
    return Response(serializers.data)


@api_view(['DELETE','POST'])
@permission_classes([IsAuthenticated])
def tweet_delete_view(request, tweet_id, *args, **kwargs):
    qs = Tweet.objects.filter(id = tweet_id)
    if not qs.exists():
        return Response({},status=404)
    # obj = qs.first()
    if not qs.exists():
        return Response({'message':'cant delete'},status=401)
    qs = qs.filter(user=request.user)
    obj = qs.first()
    obj.delete()
    return Response({'meesage':'tweet removed'}, status=200)

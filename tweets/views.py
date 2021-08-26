import random
from django.conf import settings
from django.http import HttpResponse, Http404, JsonResponse
from django.shortcuts import render, redirect
from django.utils.http import is_safe_url

from .forms import TweetForm
from .models import Tweet
from .serializers import TweetSerializer

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.
def home_view(request, *args, **kwargs):
    print(request.user)
    # return HttpResponse("<h1>Hello World</h1>")
    return render(request, "pages/home.html", context={})

def tweet_create_view(request, *args, **kwargs):
    serializer = TweetSerializer(data=request.POST or None)
    if serializer.is_valid():
        # obj = serializer.save(user=request.user, content='abc') - can change content if put like this 
        obj = serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=201)             
    return JsonResponse({}, status=400)


def tweet_create_view_pure_django(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)
    # print("ajax", request.is_ajax())
    form = TweetForm(request.POST or None)
    # print('post data is ', request.POST)
    next_url = request.POST.get("next" or None)
    # print("next_url", next_url)
    if form.is_valid():
        obj = form.save(commit=False)
        # do other form related logic
        obj.user = user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(), status=201) # 201 == created items
        # Check if the form has the next URL to redirect and if it is a valid URL within ALLOWED_HOSTS - security way
        if next_url !=None and is_safe_url(next_url, ALLOWED_HOSTS):
            return redirect(next_url)
        form = TweetForm() 
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)      
    return render(request, 'components/form.html', context={"form": form})


def tweet_list_view(request, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Android
    return json data
    """
    qs = Tweet.objects.all()
    # tweets_list = [{"id": x.id, "content": x.content, "likes": random.randint(0, 9999)} for x in qs]
    tweets_list = [x.serialize() for x in qs]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def tweet_detail_view(request, tweet_id, *args, **kwargs):
    """
    REST API VIEW
    Consume by JavaScript or Swift/Java/iOS/Android
    return json data
    """
    data = {
        "id": tweet_id,
        # "content": obj.content,
        # "image_path": obj.image.url,
    }
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not found"
        status = 404
    

    return JsonResponse(data, status=status) # json.dumps content_type='application/json'
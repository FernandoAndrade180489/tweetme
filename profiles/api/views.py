import random
from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from ..models import Profile
from ..serializers import PublicProfileSerializer

User = get_user_model()

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

@api_view(['GET'])
def profile_detail_api_view(request, username, *args, **kwargs):
    # get the profile for the passed username
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        return Response({"detail": "User not found"}, status=404)
    profile_obj = qs.first()
    data = PublicProfileSerializer(instance=profile_obj, context={"request": request})
    return Response(data.data, status=200)
 

@api_view(['GET', 'POST']) 
@permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    # profile = Profile.objects.filter(user__username=username).first()
    if me.username == username:
        my_followers = me.profile.followers.all()
        return Response({"count": my_followers.count()}, status=200)
    if not other_user_qs.exists():
        return Response({}, status=404)
    other = other_user_qs.first()
    profile = other.profile
    data = request.data or {} # If there isn's request data is equal empty dic {}
   
    action = data.get("action")    
    if action == "follow":
        profile.followers.add(me)
    elif action == "unfollow":
        profile.followers.remove(me)
    else:
        pass
    data = PublicProfileSerializer(instance=profile, context={"request": request})
    return Response(data.data, status=200)

    """
    It's not necessary Serializer, because I am return only count data and not the followers of a user.
    """

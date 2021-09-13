from django.conf import settings
from django.db import models
from django.db.models.signals import post_save

User = settings.AUTH_USER_MODEL

class FollowerRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey("Profile", on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=220, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    followers = models.ManyToManyField(User, related_name='following', blank=True, through=FollowerRelation)
    """
    obj = Profile.objects.first()
    obj.followers.all() -> All users following this profile
    user.following.all() -> All users I follow
    """
    

def user_did_save(sender, instance, created, *args, **kwargs):
    # Profile.objects.get_or_create(user=instance) - create when save new or update User
    if created:
        Profile.objects.get_or_create(user=instance)    

post_save.connect(user_did_save, sender=User)

# after the user logs in -> verify profile
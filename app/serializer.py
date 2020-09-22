from rest_framework import serializers
from .models import  Tasks_db

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tasks_db
        fields=['id','task','completed']

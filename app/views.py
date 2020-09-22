from django.shortcuts import render
from django.contrib import messages
from .forms import Tasks
from .models import Tasks_db
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse, HttpResponseRedirect
from rest_framework.parsers import JSONParser
from .serializer import TaskSerializer
from rest_framework import viewsets,generics,mixins
from rest_framework.views import APIView

# Create your views here.
def home(request):
    allTask=Tasks_db.objects.all()
    return render(request, 'index.html',{'tasks':allTask} )
def add_task(request):
    if request.method=='POST':
        form = Tasks(request.POST) # * A form bound to the POST data
        if form.is_valid():
              
             TasksDb_instance = Tasks_db.objects.create(task=form.cleaned_data['task'])
             print (form.cleaned_data['task'])
             messages.success(request, 'Task added successfull')
             return HttpResponseRedirect('/add_task')
        else:
             messages.error(request, 'Task not added')
             return HttpResponseRedirect('/add_task')
            
        # print('Post request')
    else:
        fm=Tasks()
        print('Get Request')
        return render(request, 'add_task.html',{'form':fm} )
    
def delete_all(request):
    Tasks_db.objects.all().delete()
    return HttpResponseRedirect('/')

class TaskViewSet(viewsets.GenericViewSet, mixins.ListModelMixin,mixins.CreateModelMixin,mixins.UpdateModelMixin,mixins.RetrieveModelMixin,mixins.DestroyModelMixin):
    serializer_class=TaskSerializer
    queryset=Tasks_db.objects.all()

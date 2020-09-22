from django.contrib import admin

# Register your models here.
from .models import Tasks_db

class Tasks_admin(admin.ModelAdmin):
    list_display    = ['tasks']
admin.site.register(Tasks_db)
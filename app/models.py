from django.db import models

# Create your models here.
class Tasks_db(models.Model):
    task=models.TextField()
    completed=models.BooleanField(default=False,blank=True)
    def __str__(self):
        return self.task

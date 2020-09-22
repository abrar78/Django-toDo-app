from django import forms

class Tasks(forms.Form):
    task=forms.CharField(widget=forms.TextInput(attrs={'class':'form-control', 'aria-label':'Add Task'}))
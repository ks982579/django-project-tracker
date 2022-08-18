from django import forms

class PasswordResetForm(forms.Form):
    password1 = forms.CharField(max_length=255)
    password2 = forms.CharField(max_length=255)
from django.forms import ModelForm
from server.models.usuario import Usuario


class UserForm(ModelForm):
    class Meta:
        model = Usuario
        fields = ['senha']
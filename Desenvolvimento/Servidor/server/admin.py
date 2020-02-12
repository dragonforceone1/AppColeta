# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models.endereco import Endereco  # samuel
from .models.estado import Estado  # samuel
from .models.municipio import Municipio  # samuel
from .models.pais import Pais  # samuel
from .models.usuario import Usuario

from .models.local import Local
from .models.coleta import Coleta
from .models.rota import Rota
from .models.rota_has_local import Rota_has_Local

from .models.associacao import Associacao
from .models.unidade import Unidade
from .models.Pev import Pev

admin.site.register(Usuario)
admin.site.register(Endereco)
admin.site.register(Municipio)
admin.site.register(Estado)
admin.site.register(Pais)

admin.site.register(Coleta)
admin.site.register(Local)
admin.site.register(Rota)
admin.site.register(Rota_has_Local)

admin.site.register(Associacao)
admin.site.register(Unidade)
admin.site.register(Pev)
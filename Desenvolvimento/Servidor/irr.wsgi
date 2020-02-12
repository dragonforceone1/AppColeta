import os, sys
sys.path.append('/home/vitor/Desktop/appColeta-back_end/appColeta/Desenvolvimento/Servidor')
sys.path.append('/home/vitor/Desktop/appColeta-back_end/appColeta/Desenvolvimento/Servidor/config')
os.environ['PYTHON_EGG_CACHE'] = '/home/vitor/Desktop/appColeta-back_end/appColeta/Desenvolvimento/Servidor/.python-eggs'
os.environ['DJANGO_SETTINGS_MODULE'] = 'config.settings'
from django.core.wsgi import get_wsg i_application
application = get_wsgi_application()

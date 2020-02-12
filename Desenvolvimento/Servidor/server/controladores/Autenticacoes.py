import hashlib
import random
import string


def randomWord(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))


def generateToken(Usuario, email):
    usuario = Usuario.objects.get(email=email)
    return hashlib.sha3_256((usuario.senha + str(usuario.id)).encode('ascii')).hexdigest()

import { HttpClient } from '@angular/common/http';
import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario/usuario';
import { Endereco } from '../../model/usuario/endereco';
import { TipoUsuario } from '../../model/usuario/tipoUsuario';
import { TipoVisibilidade } from '../../model/usuario/tipoVisibilidade';
import { Municipio } from '../../model/usuario/municipio';
import { Estado } from '../../model/usuario/estado';
import { Pais } from '../../model/usuario/pais';

/*
  Generated class for the ArmazenamentoLocalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArmazenamentoLocalProvider {

  //public salvaLocal: Storage;

  constructor(public http: HttpClient, public storage: Storage) {
    //console.log('Hello ArmazenamentoLocalProvider Provider');
    //this.salvaLocal = storage;
  }

  salvaUsuario(usuario: Usuario) {
    this.storage.set('usuario', usuario);
  }

  editaUsuario(usuario: Usuario) {
    this.storage.set('usuario', usuario);
  }

  recuperaUsuario(): any {
    return new Promise((resolve, reject) => {

      this.storage.get('usuario').then(val => {
        if (val == undefined) {
          resolve(null);
          return null;

        } else {
          var user = val;
          var usuario: Usuario;
          //console.log("****", user.endereco.municipio.id);

          usuario = new Usuario(user.id,
            user.nome,
            user.email,
            user.cpf,
            user.visibilidadeEmail,
            user.senha,
            user.telefone,
            user.celular,
            user.visibilidadeEmail,
            "img",
            user.visibilidadeImagem,
            user.dataNascimento,
            user.visibilidadeDataNascimento,
            new Endereco(user.endereco.logradouro, user.endereco.numero, user.endereco.bairro, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, new Municipio(user.endereco.municipio.id, user.endereco.municipio.nome, new Estado(user.endereco.municipio.estado.id, user.endereco.municipio.estado.nome, user.endereco.municipio.estado.sigla, new Pais(user.endereco.municipio.estado.pais.id, user.endereco.municipio.estado.pais.nome, user.endereco.municipio.estado.pais.sigla)))),
            TipoUsuario.USUARIO);
          resolve(usuario);
          return usuario;
        }
      });

    });
  }

  isLogado(): any {
    return new Promise((resolve, reject) => {

      this.storage.get('usuario').then(val => {
        if (val == undefined) {
          resolve(false);
          return false;
        } else {
          resolve(true);
          return true;
        }
      });
    });
  }

  retiraUsuario() {
    this.storage.remove('usuario');
  }

  salvaTokenAcesso(token: any) {
    this.storage.set('token_acesso', token);
  }

  retiraTokenAcesso() {
    this.storage.remove('token');
  }


}

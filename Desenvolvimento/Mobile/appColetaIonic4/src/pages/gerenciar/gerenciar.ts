import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';


import { Usuario } from '../../model/usuario/usuario';
import { TipoVisibilidade } from '../../model/usuario/tipoVisibilidade';
import { Endereco } from '../../model/usuario/endereco';
import { Municipio } from '../../model/usuario/municipio';
import { Estado } from '../../model/usuario/estado';
import { Pais } from '../../model/usuario/pais';
import { TipoUsuario } from '../../model/usuario/tipoUsuario';
import { PerfilPage } from '../perfil/perfil';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { HttpProvider } from '../../providers/usuarioProvider';

@IonicPage()
@Component({
  selector: 'page-gerenciar',
  templateUrl: 'gerenciar.html',
})
export class GerenciarPage {


  public usuario: Usuario;
  public usuarioAlterado: Usuario;

  public lista_paises: any;
  public lista_estados: any;
  public lista_municipios: any;

  municipio: string;
  estado: string;
  pais: string;

  visibilidade_perfil: number;

  public editar = false;

  photo: string = '../../assets/imgs/logo.png';

  constructor(public camera: Camera,
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    public httpProvider: HttpProvider) {


    this.usuario = new Usuario(-1, "", "", "", TipoVisibilidade.PRIVADA, "", 0, 0, TipoVisibilidade.PRIVADA, "img", TipoVisibilidade.PRIVADA, null, TipoVisibilidade.PRIVADA, new Endereco("", 0, "", TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, new Municipio(1, "", new Estado(0, "", "", new Pais(1, "", "BRA")))), TipoUsuario.USUARIO);

    this.carregaDados();
  }

  carregaDados() {
    this.httpProvider.armazenamentoLocal.recuperaUsuario().then(usuario => {
      if (usuario == null) {
        alert("Erro!");
        this.goToLogin();
      } else {

        this.usuario = usuario;

        this.usuarioAlterado = this.usuario;
        this.visibilidade_perfil = this.usuario.getVisibilidadeEmail();

        this.carregaPaises();
        this.pais = "" + this.usuario.getEndereco().getMunicipio().getEstado().getPais().getIdentificador();
        this.carregaEstado();
        this.estado = "" + this.usuario.getEndereco().getMunicipio().getEstado().getIdentificador();
        this.carregaMunicipio();
        this.municipio = "" + this.usuario.getEndereco().getMunicipio().getIdentificador();
      }
    });
  }

  ionViewDidLoad() {
    ////console.log('ionViewDidLoad GerenciarPage');
  }

  goToLogin() {
    this.navCtrl.push(HomePage);
  }

  presentPromptPic() {
    let alerta = this.alertCtrl.create({
      title: 'Alterar foto',
      buttons: [
        {
          text: 'Galeria',
          role: 'Galeria',
          handler: data => {
            ////console.log('Galeria clicked');
          }
        },
        {
          text: 'Camera',
          role: 'camera',
          handler: data => {
            this.takePicture();
            ////console.log('Camera clicked');
          }
        }
      ]
    });
    alerta.present();
  }

  presentPromptName() {
    let alerta = this.alertCtrl.create({
      title: 'Nome',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome',
          value: '' + this.usuario.getNome()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Alterar',
          handler: data => {
            //console.log(data.nome);
            this.usuarioAlterado.setNome('' + data.nome);

          }
        }
      ]
    });
    alerta.present();
  }

  presentPromptEmail() {
    let alerta = this.alertCtrl.create({
      title: 'Email',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: this.usuario.getEmail()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Alterar',
          handler: data => {
            this.usuarioAlterado.setEmail(data.email);
          }
        }
      ]
    });
    alerta.present();
  }

  presentPromptTel() {
    let alerta = this.alertCtrl.create({
      title: 'Telefone',
      inputs: [
        {
          name: 'telefone',
          placeholder: 'Telefone',
          value: '' + this.usuario.getTelefone()
        },
        {
          name: 'celular',
          placeholder: 'Celular',
          value: '' + this.usuario.getCelular()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Alterar',
          handler: data => {
            this.usuarioAlterado.setTelefone(data.telefone);
            this.usuarioAlterado.setCelular(data.celular);

          }
        }
      ]
    });
    alerta.present();
  }


  presentPromptDate() {
    let alerta = this.alertCtrl.create({
      title: 'Data',
      inputs: [
        {
          name: 'dataN',
          type: 'date',
          placeholder: 'Data'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Alterar',
          handler: data => {
            //console.log("Data: ", data.dataN);
            this.usuarioAlterado.setDataNascimento(data.dataN);
          }
        }
      ]
    });
    alerta.present();
  }

  presentPromptAddress() {

    let alert = this.alertCtrl.create({
      title: 'Endereço',
      inputs: [
        {
          name: 'logradouro',
          placeholder: 'Logradouro',
          value: this.usuario.getEndereco().getLogradouro()
        },
        {
          name: 'numero',
          placeholder: 'Numero',
          value: "" + this.usuario.getEndereco().getNumero()
        },
        {
          name: 'bairro',
          placeholder: 'Bairro',
          value: this.usuario.getEndereco().getBairro()
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Alterar',
          handler: data => {
            this.usuarioAlterado.getEndereco().setLogradouro(data.logradouro);
            this.usuarioAlterado.getEndereco().setNumero(data.numero);
            this.usuarioAlterado.getEndereco().setBairro(data.bairro);
          }
        }
      ]
    });
    alert.present();
  }


  presentPromptSenha() {
    let alerta = this.alertCtrl.create({
      title: 'Senha',
      inputs: [
        {
          name: 'senha_atual',
          placeholder: 'Senha Atual',
          type: 'password',
          value: ''
        },
        {
          name: 'senha_nova',
          placeholder: 'Nova Senha',
          type: 'password',
          value: ''
        },
        {
          name: 'conf_senha_nova',
          placeholder: 'Confirmar Nova Senha',
          type: 'password',
          value: ''
        }

      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');

          }
        },
        {
          text: 'Alterar',
          handler: data => {

            //if (data.senha_atual == this.usuario.getSenha()) {
              //console.log('1');
              if (data.senha_nova == data.conf_senha_nova) {
                //console.log('2');
                this.httpProvider.alterarSenhaUsuario(this.usuario.getIdentificador(), data.senha_atual, data.senha_nova).then(resp=>{
                  if(resp){
                    alert("Senha alterada com sucesso!");
                  }else{
                    alert("Erro ao alterar senha!");
                  }
                });
                //this.usuarioAlterado.setSenha(''+data.nome);
              } else {
                //console.log('3');
              }
            /*} else {
              //console.log('4');
            }*/

          }
        }
      ]
    });
    alerta.present();
  }

  permiteMunicipio() {
    this.editar = !this.editar;
  }

  salvar() {
    this.httpProvider.editarUsuario(this.usuarioAlterado).then(resposta => {
      if (resposta) {
        this.httpProvider.armazenamentoLocal.salvaUsuario(this.usuarioAlterado);
        alert("Salvo com sucesso!");
        this.goToProfile();
      } else {
        alert("Erro ao salvar!");
      }
    });
  }


  alterarVisibilidade(){
    this.usuarioAlterado.setVisibilidadeEmail(this.visibilidade_perfil);
  }

  alterarPais() {
    for (let pais of this.lista_paises) {
      if (pais.id == this.municipio) {
        //console.log("Selecionado: " + pais.nome);
        this.usuarioAlterado.getEndereco().getMunicipio().getEstado().getPais().setIdentificador(parseInt(pais.id));
        this.usuarioAlterado.getEndereco().getMunicipio().getEstado().getPais().setNome(pais.nome);
      }
    }
  }

  alterarEstado() {
    for (let est of this.lista_estados) {
      if (est.id == this.estado) {
        //console.log("Selecionado: " + est.nome);
        this.usuarioAlterado.getEndereco().getMunicipio().getEstado().setIdentificador(parseInt(est.id));
        this.usuarioAlterado.getEndereco().getMunicipio().getEstado().setNome(est.nome);
      }
    }
  }

  alterarMunicipio() {
    for (let mun of this.lista_municipios) {
      if (mun.id == this.municipio) {
        //console.log("Selecionado: " + mun.nome);
        this.usuarioAlterado.getEndereco().getMunicipio().setIdentificador(parseInt(mun.id));
        this.usuarioAlterado.getEndereco().getMunicipio().setNome(mun.nome);
      }
    }
  }



  excluir() {
    let alerta = this.alertCtrl.create({
      title: 'Deseja mesmo excluir sua conta? Não há volta',

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: data => {

            this.httpProvider.excluirUsuario();
            this.httpProvider.armazenamentoLocal.retiraUsuario();
            this.goToLogin();
          }
        }
      ]
    });
    alerta.present();
  }

  goToProfile() {
    this.navCtrl.push(PerfilPage);
  }


  desconectar() {
    this.httpProvider.desconectarUsuario();
    this.goToLogin();
  }


  carregaPaises() {
    return new Promise((resolve, reject) => {

      this.httpProvider.http.post(this.httpProvider.URL + "listarPaises/", {}, this.httpProvider.options)
        .subscribe((result: any) => {
          resolve(result['data']);
          this.lista_paises = result['data'];
          //console.log("Paises::: ", result);
        },
          (error) => {
            //console.log("nenhum resultado " + JSON.stringify(error));
            resolve({ status: false });
            // reject(error);
          });

    });


  }

  selecionaPais(id: number) {
    //console.log("SELECIONOU");
    //this.httpProvider.listaEstados(id);
  }

  carregaEstado() {
    return new Promise((resolve, reject) => {
      var data = {
        id: 1
      };

      //console.log(data);

      this.httpProvider.http.post(this.httpProvider.URL + "listarEstados/", JSON.stringify(data), this.httpProvider.options)
        .subscribe((result: any) => {
          resolve(result);
          //console.log("Estados: ", result);
          this.lista_estados = result['data'];
        },
          (error) => {
            //console.log("nenhum resultado " + error);
            resolve({ status: false });
            // reject(error);
          });

    });

  }

  carregaMunicipio() {
    return new Promise((resolve, reject) => {
      var data = {
        id: this.estado
      };

      //console.log(data);

      this.httpProvider.http.post(this.httpProvider.URL + "listarMunicipios/", JSON.stringify(data), this.httpProvider.options)
        .subscribe((result: any) => {
          resolve(result);
          //console.log("Municipios: ", result);
          this.lista_municipios = result['data'];
        },
          (error) => {
            //console.log("nenhum resultado");
            resolve({ status: false });
            // reject(error);
          });

    });

  }



  takePicture() {
    //console.log('foto');
    this.photo = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 100,
      targetHeight: 100
    }

    this.camera.getPicture(options)
      .then((imageData) => {
        let base64image = 'data:image/jpeg;base64,' + imageData;
        this.photo = base64image;

      }, (error) => {
        console.error(error);
      })
      .catch((error) => {
        console.error(error);
      })
  }
}

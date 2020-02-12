import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Usuario } from '../../model/usuario/usuario';
import { Endereco } from '../../model/usuario/endereco';
import { Municipio } from '../../model/usuario/municipio';
import { TipoUsuario } from '../../model/usuario/tipoUsuario';
import { TipoVisibilidade } from '../../model/usuario/tipoVisibilidade';
import { AlertController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';


import { Estado } from '../../model/usuario/estado';
import { Pais } from '../../model/usuario/pais';

import { TabsPage } from '../tabs/tabs';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpProvider } from '../../providers/usuarioProvider';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  id: number;
  nome: string;
  email: string;
  cpf: string;
  visibilidadeEmail: number;
  senha: string;
  telefone: number;
  celular: number;
  visibilidadeTelefone: number;
  imagem: string;
  visibilidadeImagem: TipoVisibilidade;
  dataNascimento: Date;
  visibilidadeDataNascimento: number;
  visibilidadeEstado: TipoVisibilidade;
  tipoUsuario: TipoUsuario;
  confirmaSenha: string;
  municipio: Municipio;
  cidade: string;
  estado: string;
  pais: string;
  endereco: Endereco;
  logradouro: string;
  bairro: string;
  numero: number;
  visibilidade_perfil: number;

  public nomeCarregado: string;
  public emailCarregado: string;
  public idFacebook: string;
  public idGoogle: string;

  public lista_paises: any;
  public lista_estados: any;
  public lista_municipios: any;

  public editar: boolean;

  enderecoC: Endereco;
  usuarioC: Usuario;
  visibilidade: TipoVisibilidade;
  photo: string = '../../assets/imgs/sem_foto.png';

  constructor(public camera: Camera,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private Http: HttpProvider,
    private file: File,
    private transfer: FileTransfer,
    private base64ToGallery: Base64ToGallery //nao usado
  ) {



    const fileTransfer: FileTransferObject = this.transfer.create();

    this.lista_paises = [];

    this.carregaPaises();

    if (navParams.get('nome') != undefined) {
      this.nomeCarregado = navParams.get('nome');
      this.emailCarregado = navParams.get('email');

      if (navParams.get('idGoogle') != undefined) {
        this.idGoogle = navParams.get('idGoogle') + "";

      }

      if (navParams.get('idFacebook') != undefined) {
        this.idGoogle = navParams.get('idFacebook') + "";

      }


    } else {
      this.nomeCarregado = "";
      this.emailCarregado = "";
    }

  }

  upload() {
    /*  let loader = this.loadingCtrl.create({
        content: "Uploading..."
      });
      loader.present();*/
    //console.log("Upload");
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.photo, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
        //console.log(data + " Uploaded Successfully");
        var imageFileName: string = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
        //  loader.dismiss();
        alert("Image uploaded successfully");
      }, (err) => {
        //console.log(err);
        //  loader.dismiss();
        alert(err);
      });
  }

  presentPromptPic() {
    let alert = this.alertCtrl.create({
      title: 'Adicionar foto',
      buttons: [
        {
          text: 'Galeria',
          role: 'Galeria',
          handler: data => {
            //console.log('Galeria clicked');
          }
        },
        {
          text: 'Camera',
          role: 'camera',
          handler: data => {
            this.takePicture();
            //console.log('Camera clicked');
          }
        }
      ]
    });
    alert.present();
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
        let folderName = "appColeta";
        let fileName = "sample.jpeg";
        this.writeFile(base64image, folderName, fileName);
      }, (error) => {
        console.error(error);
        alert("Erro camera.getPicture()");
      })
      .catch((error) => {
        console.error(error);
        alert("Erro camera.getPicture()");
      })
  }

  //here is the method is used to write a file in storage
  public writeFile(base64Data: any, folderName: string, fileName: any) {
    let contentType = this.getContentType(base64Data);
    //  let DataBlob = this.base64toBlob(content, contentType);
    let DataBlob = this.base64toBlob(base64Data, contentType);

    // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.
    let filePath = this.file.externalRootDirectory; //+ folderName;
    this.file.writeFile(filePath, fileName, DataBlob, contentType).then((success) => {
      //console.log("File Writed Successfully", success);
      alert("Arquivo escrito com sucesso");
    }).catch((err) => {
      //console.log("Error Occured While Writing File", err);
      alert("Erro ao escrever arquivo");
    })
  }
  //here is the method is used to get content type of an bas64 data
  public getContentType(base64Data: any) {
    let block = base64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }
  //here is the method is used to convert base64 data to blob data
  public base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize: number = 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
    //alert('ID:' +this.navParams.data);
    if (this.navParams.data == undefined) {
      this.navParams.data.email = "Email";
    }
  }

  saveUser() {

    this.visibilidade = TipoVisibilidade.PRIVADA;

    if (this.visibilidade_perfil == 0) {
      this.visibilidade = TipoVisibilidade.PRIVADA;
    } else if (this.visibilidade_perfil == 1) {
      this.visibilidade = TipoVisibilidade.PROTEGIDA;
    } else if (this.visibilidade_perfil == 2) {
      this.visibilidade = TipoVisibilidade.PUBLICA;
    }

    this.enderecoC = new Endereco(this.logradouro, this.numero, this.bairro, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, TipoVisibilidade.PRIVADA, new Municipio(1, this.cidade, new Estado(1, this.estado, "MG", new Pais(1, this.pais, "BRA"))));
    this.usuarioC = new Usuario(-1, this.nome,
      this.email,
      Usuario.cpfSemFormato(this.cpf),
      this.visibilidade,
      this.senha,
      this.telefone,
      this.celular,
      this.visibilidade,
      "img",
      this.visibilidade,
      this.dataNascimento,
      this.visibilidade,
      this.enderecoC,
      TipoUsuario.USUARIO);

    //console.log(this.usuarioC);
    if (this.visibilidadeDataNascimento == undefined) {
      this.visibilidadeDataNascimento = 1;
    }
    if (this.visibilidadeEmail == undefined) {
      this.visibilidadeEmail = 1;
    }
    if (this.visibilidadeEstado == undefined) {
      this.visibilidadeEstado = 1;
    }
    if (this.visibilidadeTelefone == undefined) {
      this.visibilidadeTelefone = 1;
    }

    


    if (this.usuarioC.getCpf)
      this.Http.cadastrarUsuario(this.usuarioC, this.idFacebook, this.idGoogle).then(resposta => {
        //this.goToLogin();
        this.Http.autenticarUsuario(this.usuarioC.getEmail(), this.usuarioC.getSenha()).then(resp =>{
          if(resp){
            alert("Usuário cadastrado com sucesso!");
            this.goToProfile();
          }else{
            alert("Erro ao cadastrar Usuário!")
          }
        });
        if (resposta) {
          //alert("Usuário cadastrado com sucesso!");
          /*this.Http.autenticarUsuario(this.usuarioC.getEmail(), this.usuarioC.getSenha());
          this.Http.armazenamentoLocal.salvaUsuario(this.usuarioC);
          this.validar(this.usuarioC);*/
        } else {
          //alert("Erro ao cadastrar Usuário!");
        }
      });
  }

  /*validar(user: Usuario) {
    if (user != null) {
      this.goToProfile();
    }

  }*/

  goToProfile() {
    this.navCtrl.push(TabsPage);
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  register() {

    if (this.nome == undefined) {
      alert("Por favor, insira o Nome.");
    } else if (this.cpf == undefined) {
      alert("Por favor, insira o CPF.");
    } else if (this.email == undefined) {
      alert("Por favor, insira o Email.");
    } else if (this.senha == undefined) {
      alert("Por favor, insira a Senha.");
    } else if (this.confirmaSenha == undefined) {
      alert("Por favor, confirme a senha.");
    } else if (this.dataNascimento == undefined) {
      if (this.senha != this.confirmaSenha) {
        alert("As senhas estão diferentes, por favor, verifique-as novamente.");
      } else {
        alert("Por favor, insira a Data de Nascimento.");
      }
    } else if (this.telefone == undefined) {
      alert("Por favor, insira o Telefone.");
    } else if (this.celular == undefined) {
      alert("Por favor, insira o Celular.");
    } else if (this.pais == undefined) {
      alert("Por favor, insira o País.");
    } else if (this.estado == undefined) {
      alert("Por favor, insira o Estado.");
    } else if (this.municipio == undefined) {
      alert("Por favor, insira o Município.");
    } else if (this.logradouro == undefined) {
      alert("Por favor, insira o Logradouro.");
    } else if (this.bairro == undefined) {
      alert("Por favor, insira o Bairro.");
    } else if (this.numero == undefined) {
      alert("Por favor, insira o Número.");
    } else {
      this.saveUser();
    }

  }

  public mascaraCPF(v: string) {
    if (v == undefined) {
      alert("Insira o CPF");
    } else if (Usuario.validarCpf(v)) {
      return Usuario.mascaraCPF(v);
    } else {
      alert("CPF incorreto! Insira um CPF válido.");
      return "";
    }
  }

  carregaPaises() {
    return new Promise((resolve, reject) => {

      this.Http.http.post(this.Http.URL + "listarPaises/", {}, this.Http.options)
        .subscribe((result: any) => {
          resolve(result['data']);
          this.lista_paises = result['data'];
          this.pais = '1';
          this.carregaEstado();
        },
          (error) => {
            //console.log("nenhum resultado");
            resolve({ status: false });
            // reject(error);
          });

    });
  }

  selecionaPais(id: number) {
    //console.log("SELECIONOU");
    //this.Http.listaEstados(id);
  }

  carregaEstado() {
    return new Promise((resolve, reject) => {
      var data = {
        id: this.pais
      };

      //console.log(data);

      this.Http.http.post(this.Http.URL + "listarEstados/", JSON.stringify(data), this.Http.options)
        .subscribe((result: any) => {
          resolve(result);
          //console.log("Estados: ", result);
          this.lista_estados = result['data'];
        },
          (error) => {
            //console.log("nenhum resultado");
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

      this.Http.http.post(this.Http.URL + "listarMunicipios/", JSON.stringify(data), this.Http.options)
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

  ionViewWillEnter() {
    this.carregaPaises();
  }

}

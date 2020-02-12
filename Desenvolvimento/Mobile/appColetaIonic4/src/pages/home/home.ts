import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { PerfilPage } from '../perfil/perfil';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HttpClient } from '@angular/common/http';
import { HttpProvider } from '../../providers/usuarioProvider';
import { Usuario } from '../../model/usuario/usuario';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userGoogle:any = {} //Recebe dados da API do google para ser jogado nos campos
  userfb:any = {} //Recebe dados da API do facebook para ser jogado nos campos
  userdata:any={}; //Informações do usuário vindas do facebook

  constructor(
    public navCtrl: NavController,     
    private googlePlus:GooglePlus,
    private http: HttpClient,
    private fb:Facebook,
    private provider: HttpProvider
    ) {

      
  }

  ionViewWillEnter(){
    this.confereLogado();
  }
  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
}

  ionViewWillLeave() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
        });

    }
}

  goToProfile(){
      this.navCtrl.push(TabsPage);
    }
  
  goToRegister(){
      this.navCtrl.push(RegisterPage);
  }

  goToApp(){
    this.navCtrl.push(TabsPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  

  loginGoogle(){//Função para abrir o login do Google
    
    
    let b = this.googlePlus.login({
      'webClientID' : '299922926347-ang9b3h0m7hgt0clpqtckjgmkjlde7ck.apps.googleusercontent.com',
      'offline': true
      
    })
      .then(res => {
        this.userGoogle = res;
        let a = this.getGoogleData();

        this.provider.autenticarUsuarioGoogle(res.email, res.userId).then(resposta => {
          if(resposta){
            this.goToProfile();
          }else{
            alert("Usuario ainda nao cadastrado!");
            this.navCtrl.push(RegisterPage,{'idGoogle': res.userId, 'nome': res.displayName, 'email': res.email});
          }
        });
                
      })
      .catch(
        err => {console.error(err); alert("ERRO ao conectar com o Google!")
      });
  }

  getGoogleData(){//Função para retornar dados do login do google
    this.http.get('https://www.googleapis.com/plus/v1/people/me?access_token='+this.userGoogle.accessToken)
    .subscribe((data:any)=>{

      this.userGoogle.name =  data.displayName;
    })
  }

  loginFacebook(){//Função para abrir o login do Facebook
    //alert("FACEBOOK");
    this.fb.login(['public_profile', 'email'])
  .then((res: FacebookLoginResponse) => {
    if(res.status==='connected'){
      //alert('f: ' + JSON.stringify(res));
      this.userfb.img = 'http://graph.facebook.com/'+res.authResponse.userID+'/picture?type=square'
      this.getFacebookData(res.authResponse.accessToken);
      let resultado = this.provider.autenticarUsuarioFacebook(this.userdata.email, this.userdata.id);
      
        alert("RESULT: " + resultado);
        if(resultado){
          alert(JSON.stringify(this.userdata));
          alert(this.userdata.id)
          this.navCtrl.push(RegisterPage,{'idFacebook': this.userdata.id, 'nome': this.userdata.name, 'email': this.userdata.email});
        }
      alert(this.userdata);
      //this.navCtrl.push(RegisterPage,this.userdata);
    }else{
      alert('Houve problemas ao autenticar sua conta ao Facebook, tente novamente.')
    }
    //console.log('Logged into Facebook!', res)
  })
  .catch(e => console.log('Error logging into Facebook', e));
  }

  getFacebookData(access_token:string){//Função para requisição de dados do Facebook
      let url = 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email&access_token='+access_token;
      this.http.get(url).subscribe(data =>{
        this.userdata=data;
      })
  }

  loginVisitor(){
    alert("Você está entrando como visistante, desta forma, algumas funções estarão restritas até que você se autentique.")
    this.navCtrl.push(PerfilPage);
    this.navCtrl.push(TabsPage);
  }

  //confere se ja tem usuario logado, se sim, vai pra pagina de perfil
  private confereLogado(){
    this.provider.armazenamentoLocal.isLogado().then(logado => {
      if(logado){
        this.goToProfile();
      }
    });
    
  }
}

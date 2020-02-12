import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Icon } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ControladorColetaProvider } from '../../providers/coletaProvider';
import { Local } from '../../model/coleta/local';
import { ColetaLocalPage } from '../coleta-local/coleta-local';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { GerenciarPage } from '../gerenciar/gerenciar';
import { InfoAssociacaoPage } from '../info-associacao/info-associacao';
import { InfoLevPage } from '../info-lev/info-lev';

declare var google;


@IonicPage()
@Component({
  selector: 'page-mapa-coleta',
  templateUrl: 'mapa-coleta.html',
})
export class MapaColetaPage {
  @ViewChild("info", { read: ElementRef }) botaoinfo;
  textoBotao: string = "-";
  tipo: any;
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer();
  tipoPesquisa: number = 1;
  startPosition: any;
  searchPosition: any;
  originPosition: string;
  destinationPosition: string;
  pesquisaPosition: string;
  map: any;
  ponto: any;
  locais: Local[];
  p: any;



  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private coletaProvider: ControladorColetaProvider) {
    this.locais = [];
  }


  //Função para adquirir a localização atual do usuário e criar o mapa sobre ela
  inicializaMapa() {
    console.log("Inicializando o mapa..")
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      suppressMarkers: true
    });
    this.geolocation.getCurrentPosition().then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.startPosition = position;
      const mapOptions = {
        zoom: 14,
        center: this.startPosition,
        disableDefaultUI: true

      }

      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      this.directionsDisplay.setMap(this.map);
      this.calculateRoute("Belo Horizonte", "Igarapé");
      this.carregarLocaisProximos(resp.coords.latitude, resp.coords.longitude, this.tipoPesquisa, () => this.colocarPontos())
      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });

    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });

  }


  colocarPontos() {

    //Colocando o Marcador
   if(this.tipoPesquisa == 1){
    var busca1 = 1;
    var busca2 = 1;
   }else if (this.tipoPesquisa == 2 ){
    var busca1 = 2;
    var busca2 = 3;
   }
    for (let i in this.locais) {
      if (this.locais[i].getTipoLocal() == 1){
        var link = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      }
      if (this.locais[i].getTipoLocal() == 2){
        var link = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      }
      if (this.locais[i].getTipoLocal() == 3){
        var link = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      }
      if (this.locais[i].getTipoLocal() == busca1 || this.locais[i].getTipoLocal() == busca2 ) {
        console.log("TIPO LOCAL: " + this.locais[i].getTipoLocal());
        const marker = new google.maps.Marker({            
          icon: link,
          position: new google.maps.LatLng(this.locais[i].getLatitude(), this.locais[i].getLongitude()),
          title: this.locais[i].getRotulo(),
          map: this.map
        })
        //}

        //Janela de Informações
        var infowindow = new google.maps.InfoWindow(), marker;
        google.maps.event.addListener(marker, 'click', ((marker, i) => {
          return () => {
            this.textoBotao = this.locais[i].getRotulo();
            this.tipo = this.locais[i].getTipoLocal();
            infowindow.setContent(
              this.botaoinfo.nativeElement
              //'<p>'+this.locais[i].getRotulo()+'</p>'+
              //'<button onclick="goToColeta()">Mais informações</button>'           
            );
            infowindow.open(this.map, marker);
            //this.goToColeta();
          }
        })(marker, i))
        //console.log("marker número " + i + " adicionado!")
      }
    }

  }

  pesquisaEndereco() {

    if (!this.pesquisaPosition) {
      this.alertCtrl.create({
        title: "Erro",
        message: "Digite um endereço válido."
      }).present();
      return;
    } else {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(this.pesquisaPosition, options)
        .then((coordinates: NativeGeocoderForwardResult[]) => {
          //console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude)
          this.searchPosition = new google.maps.LatLng(coordinates[0].latitude, coordinates[0].longitude);
          const mapOptions = {
            zoom: 18,
            center: this.searchPosition,
            disableDefaultUI: true
          }

          this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
          this.directionsDisplay.setMap(this.map);

          this.carregarLocaisProximos(coordinates[0].latitude, coordinates[0].longitude, this.tipoPesquisa, () => this.colocarPontos())
          const marker = new google.maps.Marker({
            position: this.searchPosition,
            map: this.map,
          });

        })
        .catch((error: any) => console.log(error));
    }
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.forwardGeocode(this.pesquisaPosition, options)
      .then((coordinates: NativeGeocoderForwardResult[]) => {
        //console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude)
        this.searchPosition = new google.maps.LatLng(coordinates[0].latitude, coordinates[0].longitude);
        const mapOptions = {
          zoom: 18,
          center: this.searchPosition,
          disableDefaultUI: true
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.directionsDisplay.setMap(this.map);
        this.carregarLocaisProximos(coordinates[0].latitude, coordinates[0].longitude, () => this.colocarPontos())
        const marker = new google.maps.Marker({
          position: this.searchPosition,
          map: this.map,
        });

      })
      .catch((error: any) => console.log(error));
  }


  carregarLocaisProximos(latitude, longitude, tipo, cb?: () => void) {
    this.coletaProvider.pesquisarLocaisProximos(latitude, longitude, tipo).then(resposta => {
      console.log("*-------------------------------------------------------------------*");
      console.log("RESP LOCAIS: ", resposta);
      this.locais = resposta;
      if (cb) cb();
    });
  }

  encaminhaPagina(rotulo: string, tipo: any) {

    if(tipo == 1){
    this.goToColeta(rotulo);
    }
    if(tipo == 2){
      this.goToLEV(rotulo);
    }
    if(tipo == 3){
      this.goToAssociacao(rotulo);
      }
  }

  goToColeta(rotulo: string) {
    this.navCtrl.push(ColetaLocalPage, { rotulo: rotulo });
  }

  goToLEV(rotulo: string) {
    this.navCtrl.push(InfoLevPage, { rotulo: rotulo });
  }

  goToAssociacao(rotulo: string) {
    this.navCtrl.push(InfoAssociacaoPage, { rotulo: rotulo });
  }

  calculateRoute(destination: any, origin: any) {
    if (destination && origin) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: origin,
        destination: destination,
        waypoints: [{ location: 'Campinas' }],
        travelMode: 'DRIVING'
      };

      //this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

  mostrarColeta() {
    this.tipoPesquisa = 1;
    console.log(this.tipoPesquisa)
    this.inicializaMapa()

  }

  mostrarPEVS() {
    this.tipoPesquisa = 2;
    console.log(this.tipoPesquisa)
    this.inicializaMapa()
  }

  modoMapa(modo){
    if(modo._value == "porta"){
      this.mostrarColeta()
    }else{
      this.mostrarPEVS()
    }
  }


  ionViewDidLoad() {
    this.inicializaMapa()
  }
}
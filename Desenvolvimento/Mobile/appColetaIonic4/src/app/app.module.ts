import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { GerenciarPage } from '../pages/gerenciar/gerenciar';
import { PesquisarPage } from '../pages/pesquisar/pesquisar';
import { RegisterPage } from '../pages/register/register';
import { HttpProvider } from '../providers/usuarioProvider';
import { HttpModule} from "@angular/http";
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook  } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClientModule} from "@angular/common/http";
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';


import { Storage, IonicStorageModule } from '@ionic/storage';

import { Camera } from '@ionic-native/camera';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { MapaColetaPage } from '../pages/mapa-coleta/mapa-coleta';
import { ControladorColetaProvider } from '../providers/coletaProvider';
import { ServidorProvider } from '../providers/servidor/servidor';
import { ArmazenamentoLocalProvider } from '../providers/armazenamentoLocal/armazenamentoLocal';
import { ColetaLocalPage } from '../pages/coleta-local/coleta-local';
import { GeocoderProvider } from '../providers/geocoder/geocoder';
import { InfoAssociacaoPage } from '../pages/info-associacao/info-associacao';
import { InfoLevPage } from '../pages/info-lev/info-lev';
import { UnidadeProvider } from '../providers/unidade/unidade';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PerfilPage,
    GerenciarPage,
    PesquisarPage,
    MapaColetaPage,
    ColetaLocalPage,
    InfoAssociacaoPage,
    InfoLevPage
    
    

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot({ name: 'aluracar', storeName: 'agendamentos', driverOrder: ['indexeddb'] }), //inserido por ultimo

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    PerfilPage,
    GerenciarPage,
    PesquisarPage,
    MapaColetaPage,
    ColetaLocalPage,
    InfoAssociacaoPage,
    InfoLevPage
   
  ],
  providers: [
    StatusBar,
    GooglePlus,
    Facebook,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    Camera,
    NativeGeocoder,
    File,
    FileTransfer,
    Base64ToGallery,
    AndroidPermissions,
    ControladorColetaProvider,
    ServidorProvider,
    ArmazenamentoLocalProvider,
    GeocoderProvider,
    UnidadeProvider,
  ]
})
export class AppModule {}

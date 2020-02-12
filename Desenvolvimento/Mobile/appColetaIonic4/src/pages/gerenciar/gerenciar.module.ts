import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarPage } from './gerenciar';
import { Camera, CameraOptions } from '@ionic-native/camera';

@NgModule({
  declarations: [
    GerenciarPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarPage),
  ],
})
export class GerenciarPageModule {}

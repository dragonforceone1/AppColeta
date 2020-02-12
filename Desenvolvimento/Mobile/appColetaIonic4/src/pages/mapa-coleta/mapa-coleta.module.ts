import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapaColetaPage } from './mapa-coleta';

@NgModule({
  declarations: [
    MapaColetaPage,
  ],
  imports: [
    IonicPageModule.forChild(MapaColetaPage),
  ],
})
export class MapaColetaPageModule {}

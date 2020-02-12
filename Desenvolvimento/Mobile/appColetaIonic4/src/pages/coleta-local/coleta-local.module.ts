import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColetaLocalPage } from './coleta-local';

@NgModule({
  declarations: [
    ColetaLocalPage,
  ],
  imports: [
    IonicPageModule.forChild(ColetaLocalPage),
  ],
})
export class ColetaLocalPageModule {}

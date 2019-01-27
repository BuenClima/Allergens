import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllergensFilterPage } from './allergens-filter';

@NgModule({
  declarations: [
    AllergensFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(AllergensFilterPage),
  ],
})
export class AllergensFilterPageModule {}

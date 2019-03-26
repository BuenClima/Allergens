import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllergenProfileModalPage } from './allergen-profile-modal';

@NgModule({
  declarations: [
    AllergenProfileModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AllergenProfileModalPage),
  ],
})
export class AllergenProfileModalPageModule {}

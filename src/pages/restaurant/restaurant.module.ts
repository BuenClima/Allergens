import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantPage } from './restaurant';
import {StarRatingModule} from "ionic3-star-rating";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    RestaurantPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantPage),
    StarRatingModule,
    ComponentsModule,
  ],
})
export class RestaurantPageModule {}

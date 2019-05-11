import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantListPage } from './restaurant-list';
import {StarRatingModule} from "ionic3-star-rating";

@NgModule({
  declarations: [
    RestaurantListPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantListPage),
    StarRatingModule,
  ],
})
export class RestaurantListPageModule {}

import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestaurantProvider} from "../../providers/restaurant/restaurant";


@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  restaurant_name:any="";
  restaurant:any = {};
  restaurant_takeout:any = "";

  celery_image_url:string = 'assets/imgs/allergens/celery.png';
  crustacean_image_url:string= 'assets/imgs/allergens/crustacean.png';
  egg_image_url:string = 'assets/imgs/allergens/egg.png';
  fish_image_url:string = 'assets/imgs/allergens/fish.png';
  lupin_image_url:string = 'assets/imgs/allergens/lupin.png';
  milk_image_url:string = 'assets/imgs/allergens/milk.png';
  mollusc_image_url:string = 'assets/imgs/allergens/mollusc.png';
  mustard_image_url:string = 'assets/imgs/allergens/mustard.png';
  nuts_image_url:string = 'assets/imgs/allergens/nuts.png';
  peanuts_image_url:string = 'assets/imgs/allergens/peanuts.png';
  sasame_image_url:string = 'assets/imgs/allergens/sesame.png';
  soya_image_url:string = 'assets/imgs/allergens/soya.png';
  sulphur_image_url:string = 'assets/imgs/allergens/sulphur.png';
  wheat_image_url:string = 'assets/imgs/allergens/wheat.png';

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restaurantProvider: RestaurantProvider,
              public toastCtrl: ToastController) {
    this.restaurant_name = this.navParams.get('restaurant_name');
  }

  ionViewDidLoad() {
    this.restaurantProvider.getRestaurants().then((restaurantsSnapshot) => {
      let restaurantList = Object.keys(restaurantsSnapshot).map(key => ({type: key, value: restaurantsSnapshot[key]}));
      for (let restaurant of restaurantList){
        if (restaurant.value.restaurantName.toLowerCase() == this.restaurant_name.toLowerCase()){
          this.restaurant = restaurant.value;
          if (restaurant.value.takeOut == true){
            this.restaurant_takeout = "Yes";
          }  else {
            this.restaurant_takeout = "No";
          }
          console.log(this.restaurant);
          break;
        }
      }
    });

  }
  showInfoBubble(allergen: string) {
    const toast = this.toastCtrl.create({
      message: allergen,
      duration: 2000,
      position: "middle",
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: "Ok"
    });
    toast.present();
  }
}

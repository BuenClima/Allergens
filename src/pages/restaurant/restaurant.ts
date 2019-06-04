import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {RestaurantProvider} from "../../providers/restaurant/restaurant";
import { DishesProvider } from "../../providers/dishes/dishes";
import {DishPage} from "../dish/dish";
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  restaurant_name:any="";
  restaurant:any = {};
  restaurant_takeout:any = "";
  restaurant_id:any;

  dishes:any = "";
  breakfastList:any = [];

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

  showbreakfast: boolean = false;
  lunchlist: any;
  showlunch: boolean = false;
  dinnerList: any;
  showdinner: boolean = false;
  showMap: boolean = false;
  activated:any = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restaurantProvider: RestaurantProvider,
              public toastCtrl: ToastController) {
    this.restaurant_name = this.navParams.get('restaurant_name');
    this.breakfastList = [];
    this.lunchlist = [];
    this.dinnerList = [];

  }

  ionViewDidLoad() {
    this.restaurantProvider.getRestaurants().then((restaurantsSnapshot) => {
      let restaurantList = Object.keys(restaurantsSnapshot).map(key => ({type: key, value: restaurantsSnapshot[key]}));
      for (let restaurant of restaurantList){
        if (restaurant.value.restaurantName.toLowerCase() == this.restaurant_name.toLowerCase()){
          this.restaurant = restaurant.value;
          this.restaurant_id = restaurant.value.id;
          if (restaurant.value.takeOut == true){
            this.restaurant_takeout = "Yes";
          }  else {
            this.restaurant_takeout = "No";
          }
          console.log(this.restaurant);
          this.dishes = restaurant.value.dishes;
          break;
        }
      }
    });
  }

  showInfoBubble(allergen: string) {
    const toast = this.toastCtrl.create({
      message: allergen,
      duration: 1000,
      position: "top",
      dismissOnPageChange: true,
      showCloseButton: false,
      closeButtonText: "Ok"
    });
    toast.present();
  }

  showBreakFasts() {
    if (this.activated != 1){
      this.activated = 1
    }  else {
      this.activated= 0
    }
    this.showdinner = false;
    this.showlunch = false;
    if (this.breakfastList.length == 0){
      for (let dish of this.dishes){
        if (dish.category == "breakfast"){
          this.breakfastList.push(dish);
        }
      }
    }
    this.showbreakfast = this.showbreakfast != true;
  }

  showLunch() {
    if (this.activated != 2){
      this.activated = 2
    }  else {
      this.activated= 0
    }
    this.showdinner = false;
    this.showbreakfast = false;
    if (this.lunchlist.length == 0){
      for (let dish of this.dishes){
        if (dish.category == "lunch"){
          this.lunchlist.push(dish);
        }
      }
    }
    console.log(this.showlunch);
    this.showlunch = this.showlunch != true;
  }

  showDinner() {
    if (this.activated != 3){
      this.activated = 3
    }  else {
      this.activated= 0
    }
    this.showbreakfast = false;
    this.showlunch = false;
    if (this.dinnerList.length == 0){
      for (let dish of this.dishes){
        if (dish.category == "dinner"){
          this.dinnerList.push(dish);
        }
      }
    }
    this.showdinner = this.showdinner != true;
  }

  navigateToDish(dish) {
    this.navCtrl.push(DishPage, {dish: dish, restaurant_name: this.restaurant_name});
  }

  goHome() {
    this.navCtrl.pop();
  }

  showLocation() {
    this.showMap = this.showMap != true;
  }
}

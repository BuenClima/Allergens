import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import {RestaurantPage} from "../restaurant/restaurant";
import {AllergensFilterPage} from "../allergens-filter/allergens-filter";
import {NativeStorage} from "@ionic-native/native-storage";
import {FilterPage} from "../filter/filter";
import {MapPage} from "../map/map";

@IonicPage()
@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
})
export class RestaurantListPage {
  searchTerm: any;
  restaurant_list:any[] = [];
  sorted_restaurant_list: any[] = [];
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

  state:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
              public restaurantProvider: RestaurantProvider,
              public storage: NativeStorage, public toastCtrl: ToastController) {
    this.searchTerm = navParams.get('searchTerm');
    this.sorted_restaurant_list = [];
    if (this.navParams.get('restaurant_list')){
      this.state = 'show';
    } else {
      this.state = 'search';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RestaurantListPage');
    if (this.state == 'show'){
      this.sorted_restaurant_list = null;
      this.sorted_restaurant_list = this.navParams.get('restaurant_list');
      console.log(this.sorted_restaurant_list);
      console.log(this.restaurant_list);
    } else {
      this.loadRestaurantsByCity();
    }

  }
  loadRestaurantsByCity(){
    this.restaurantProvider.getRestaurants().then((restaurantsSnapshot) => {
      this.restaurant_list = Object.keys(restaurantsSnapshot).map(key => ({type: key, value: restaurantsSnapshot[key]}));
      for (let restaurant of this.restaurant_list){
        if (restaurant.value.city.toLowerCase().startsWith(this.searchTerm.toLowerCase())){
          this.sorted_restaurant_list.push(restaurant);
        }
      }
      localStorage.setItem('restaurant_list',JSON.stringify(this.restaurant_list));
    })
      .catch(e => { console.log(e);});
  }


  goToRestaurantDishes(name: any,id: any) {
    this.navCtrl.push(RestaurantPage,{restaurant_name: name, id: id});
  }

  navigateToAllergensFilterPage() {
    if (this.state == 'show'){
      this.navCtrl.push(AllergensFilterPage,{restaurant_list: JSON.parse(localStorage.getItem('restaurant_list'))});
    } else {
      this.navCtrl.push(AllergensFilterPage,{restaurant_list: this.restaurant_list});
    }
  }

  navigateToFilterPage() {
    this.navCtrl.push(FilterPage);
  }

  navigateToMaps() {
    this.navCtrl.push(MapPage,)
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

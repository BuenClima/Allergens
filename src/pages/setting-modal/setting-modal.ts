import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, App} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {AllergensFilterPage} from "../allergens-filter/allergens-filter";
import {FilterPage} from "../filter/filter";
import {HomePage} from "../home/home";
import {RestaurantListPage} from "../restaurant-list/restaurant-list";
import {AuthProvider} from "../../providers/auth/auth";
import {ProfileProvider} from "../../providers/profile/profile";

/**
 * Generated class for the SettingModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting-modal',
  templateUrl: 'setting-modal.html',
})
export class SettingModalPage {
  restaurantCategory: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private app: App, public auth: AuthProvider, public profileProvider: ProfileProvider) {
    this.app._setDisableScroll(true);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingModalPage');
  }

  close(){
    localStorage.setItem('open', "false");
    this.viewCtrl.dismiss();
  }

  showList() {

  }

  openProfilePage() {
    this.close();
    this.navCtrl.push(ProfilePage);
  }

  openAllergenFilter() {
    this.close();
    this.navCtrl.push(AllergensFilterPage,{'state' : false})
  }

  openRestaurantFilter() {
    this.close();
    this.navCtrl.push(FilterPage, {'state' : false})
  }

  searchByCategory() {
    let restaurant_list = JSON.parse(localStorage.getItem('restaurant_list'));
    let sorted_list = [];
    for (let restaurant of restaurant_list){
      if (restaurant.value.cuisineType.includes(this.restaurantCategory)) {
        sorted_list.push(restaurant)
      }
    }
    let sample = [];
    if (this.auth.getUser()){
      this.profileProvider.getProfile().then(
        (profile) => {
          let allergens = profile.allergens;
          console.log(allergens);

          for (let restaurant of sorted_list){
            let value = restaurant.value.allergens.some((v) => {
              return allergens.indexOf(v) !== -1
            });
            if (value){
              console.log("Encontrado");
            } else {
              console.log("No se encontro");
              sample.push(restaurant);
              console.log(restaurant)
            }
          }
          this.close();
          localStorage.setItem('current_sorted_list', JSON.stringify(sample));
          this.navCtrl.push(RestaurantListPage,{'restaurant_list' : sample});
        }
      );
    } else {
      this.close();
      localStorage.setItem('current_sorted_list', JSON.stringify(sorted_list));
      this.navCtrl.push(RestaurantListPage,{'restaurant_list' : sorted_list});
    }


  }
}

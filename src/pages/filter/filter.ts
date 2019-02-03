import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantListPage} from "../restaurant-list/restaurant-list";
import { FilterProvider } from "../../providers/filter/filter";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  restaurant_list:any = [];
  cheap_checkbox_option:boolean = false;
  mid_range_checkbox_option:boolean = false;
  fine_dining_checkbox_option:boolean = false;
  open_now_checkbox_option:boolean = false;
  take_out_checkbox_option:boolean = false;
  cuisine_type:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public filterProv: FilterProvider) {
    if (localStorage.getItem('current_sorted_list') != null){
      this.restaurant_list = JSON.parse(localStorage.getItem('current_sorted_list'));
    } else {
      this.restaurant_list = JSON.parse(localStorage.getItem('restaurant_list'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
    this.cheap_checkbox_option = this.filterProv.getFilters().cheap_checkbox_option;
    this.mid_range_checkbox_option = this.filterProv.getFilters().mid_range_checkbox_option;
    this.fine_dining_checkbox_option = this.filterProv.getFilters().fine_dining_checkbox_option;
    this.open_now_checkbox_option = this.filterProv.getFilters().open_now_checkbox_option;
    this.take_out_checkbox_option = this.filterProv.getFilters().take_out_checkbox_option;
    this.cuisine_type = this.filterProv.getFilters().cuisine_type;

  }

  ionViewCanLeave(){
    this.navCtrl.setRoot(this.navCtrl.getPrevious()).then(
      () => { console.log("Set root"); }
    ).catch(
      () => { console.log("NOP")}
    );
  }

  checkCheapRestaurants(){
    let restaurants = [];
    for (let restaurant of this.restaurant_list){
      if (restaurant.value.price == "$") {
        restaurants.push(restaurant);
      }
    }
    return restaurants;
  }

  checkMidRangeRestaurants(){
    let restaurants = [];
    for (let restaurant of this.restaurant_list){
      if (restaurant.value.price == "$$") {
        restaurants.push(restaurant);
      }
    }
    return restaurants;
  }

  checkFineDiningRestaurants(){
    let restaurants = [];
    for (let restaurant of this.restaurant_list){
      if (restaurant.value.price == "$$$") {
        restaurants.push(restaurant);
      }
    }
    return restaurants;
  }

  checkOpenNowRestaurants(){
    let restaurants = [];
    for (let restaurant of this.restaurant_list){
      let currentTime = new Date();
      let currentTimeString = (currentTime.getHours()+':'+currentTime.getMinutes().toString());
      if ( currentTimeString > restaurant.value.openTime && currentTimeString < restaurant.value.closeTime){
        restaurants.push(restaurant);
      }
    }
    return restaurants;
  }

  checkTakeOutRestaurants(){
    let restaurants = [];
    for (let restaurant of this.restaurant_list){
      if (restaurant.value.takeOut){
        restaurants.push(restaurant);
      }
    }
    return restaurants;
  }

  applyFilter() {
    this.filterProv.setFilters(this.cheap_checkbox_option,
      this.mid_range_checkbox_option, this.fine_dining_checkbox_option,
      this.open_now_checkbox_option,this.take_out_checkbox_option, this.cuisine_type);

    if (this.cheap_checkbox_option){
      let list = this.restaurant_list.sort((a,b) => (a.value.price.length > b.value.price.length)? 1:(b.value.price.length< a.value.price.length)? -1:0);
      /*if (localStorage.getItem('current_sorted_list') == null){
        localStorage.setItem('current_sorted_list',
          JSON.stringify(list));
      }*/
      localStorage.setItem('current_sorted_list', JSON.stringify(list));
      this.navCtrl.push(RestaurantListPage, {restaurant_list : list});
      return;
    }

    if (this.fine_dining_checkbox_option){
      let list = this.restaurant_list.sort((a,b) => (b.value.price.length > a.value.price.length)? 1:(a.value.price.length< b.value.price.length)? -1:0)
      /*if (localStorage.getItem('current_sorted_list') == null){
        localStorage.setItem('current_sorted_list',
          JSON.stringify(list));
      }*/
      localStorage.setItem('current_sorted_list', JSON.stringify(list));
      this.navCtrl.push(RestaurantListPage, {restaurant_list : list});
      return;
    }

    if (this.open_now_checkbox_option){
      let list = this.checkOpenNowRestaurants();
      if (localStorage.getItem('current_sorted_list') == null){

      }
      localStorage.setItem('current_sorted_list',
        JSON.stringify(list));
      this.navCtrl.push(RestaurantListPage, {restaurant_list :list });
      return;
    }

    if (this.take_out_checkbox_option){
      let list = this.checkTakeOutRestaurants();
      if (localStorage.getItem('current_sorted_list') == null){
        localStorage.setItem('current_sorted_list',
          JSON.stringify(list));
      }
      this.navCtrl.push(RestaurantListPage, {restaurant_list : list});
      return;
    }

    if (this.cuisine_type != []){
      let list = this.checkCuisineType();
      if (localStorage.getItem('current_sorted_list') == null){
        localStorage.setItem('current_sorted_list',
          JSON.stringify(list));
      }
      this.navCtrl.push(RestaurantListPage, { restaurant_list: list});
      return;
    }
  }

  checkCuisineType() {
      let filtered_restaurants = [];
      for (let restaurant of this.restaurant_list){
        if(restaurant.value.cuisineType.some(r=> this.cuisine_type.indexOf(r) >= 0)){
          filtered_restaurants.push(restaurant);
        }
      }
      return filtered_restaurants;
  }
}

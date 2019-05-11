import { Component } from '@angular/core';
import {ModalController, NavController, ToastController} from 'ionic-angular';
import { RestaurantProvider } from "../../providers/restaurant/restaurant";
import { RestaurantPage } from "../restaurant/restaurant";
import {FormControl} from "@angular/forms";
import { LocationTrackerProvider } from "../../providers/location-tracker/location-tracker";
import { Platform} from "ionic-angular";
import {Geolocation, Geoposition} from "@ionic-native/geolocation";
import {SettingModalPage} from "../setting-modal/setting-modal";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Environment, HtmlInfoWindow, MarkerCluster, CameraPosition
} from '@ionic-native/google-maps';
import {RestaurantListPage} from "../restaurant-list/restaurant-list";

const browserMapsAPIKey = 'AIzaSyBWjg2YgCConFzw59sqUi34nsnLNygVEZU';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  searchTerm: any;
  searchFormControl:FormControl;
  restaurant_list:any;
  placeholder_search_bar = "Tap a city!";

  map:GoogleMap;
  position:Geoposition = null;

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
  error: any;
  restaurant_list_sorted:any;

  showBubble:boolean = false;
  bubbletext: string;
  private SettingsModal: any;
  private open: boolean;

  constructor(public navCtrl: NavController, public restaurantProvider: RestaurantProvider,
              public locationTracker: LocationTrackerProvider, public platform: Platform,
              public geolocation: Geolocation, public toastCtrl: ToastController,
              public modalCtrl: ModalController) {
    this.searchFormControl = new FormControl();
    localStorage.setItem('open', "false")

  }

  ionViewWillEnter(){
    localStorage.removeItem('current_sorted_list');
    localStorage.removeItem('allergen_options');
    //localStorage.removeItem('restaurant_list');
    this.searchTerm = "";
  }


  ionViewDidLoad(){
    //this.startLocationTracker();
    this.restaurantProvider.createRestaurantsOnFirebase();
    this.restaurantProvider.getRestaurants().then((restaurantsSnapshot) => {
      let restaurantList = Object.keys(restaurantsSnapshot).map(key => ({type: key, value: restaurantsSnapshot[key]}));
      this.restaurant_list =  restaurantList;
      restaurantList.sort((a,b) => (a.value.rank > b.value.rank)? 1:(b.value.rank < a.value.rank)? -1:0);
      this.restaurant_list_sorted =  restaurantList.slice(0,5);
      localStorage.setItem('restaurant_list',JSON.stringify(this.restaurant_list));
    });
    this.platform.ready().then(()=>{
      //this.getPosition();
      this.loadMap();
    });
  }


  public startLocationTracker(){
    this.locationTracker.startTracking();
  }


  onSearchInput(){
    this.navCtrl.push(RestaurantListPage,{searchTerm:this.searchTerm});
  }

  getPosition():any{
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000
    }).then(
      (response) => {
        this.position = response;
      }
    ).catch(
      (error) => {
       console.log(error)
      }
    );
  }

  loadMap(){

  }


  onCancelInput() {
    this.navCtrl.push(HomePage);
  }

  goToRestaurantDishes(name: any,id: any) {
    this.navCtrl.push(RestaurantPage,{restaurant_name: name, id: id});
  }

  showInfoBubble(allergen: string) {
    const toast = this.toastCtrl.create({
      message: allergen,
      duration: 2000,
      position: "middle",
      dismissOnPageChange: true,
      showCloseButton: true,
      closeButtonText: "Ok",
      cssClass: "test"
    });
    toast.present();
  }

  clickOnSettings() {
    console.log("Click");
    if (localStorage.getItem('open') == "false"){
      this.SettingsModal = this.modalCtrl.create(SettingModalPage,{},{cssClass: "settings-modal"});
      this.SettingsModal.present();
      localStorage.setItem('open', "true")

    }
  }
}

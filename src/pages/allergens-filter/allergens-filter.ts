import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RestaurantListPage} from "../restaurant-list/restaurant-list";


@IonicPage()
@Component({
  selector: 'page-allergens-filter',
  templateUrl: 'allergens-filter.html',
})
export class AllergensFilterPage {

  celery_checkbox_option:boolean = false;
  crustacean_checkbox_option:boolean = false;
  egg_checkbox_option:boolean = false;
  fish_checkbox_option:boolean = false;
  lupin_checkbox_option:boolean = false;
  milk_checkbox_option:boolean = false;
  mollusc_checkbox_option:boolean = false;
  mustard_checkbox_option:boolean = false;
  nuts_checkbox_option:boolean = false;
  peanuts_checkbox_option:boolean = false;
  sasame_checkbox_option:boolean = false;
  soya_checkbox_option:boolean = false;
  sulphur_checkbox_option:boolean = false;
  wheat_checkbox_option:boolean = false;

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

  restaurant_list:any[]= [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.restaurant_list = this.navParams.get('restaurant_list');
    if (localStorage.getItem('current_sorted_list')!= null){
      this.restaurant_list = JSON.parse(localStorage.getItem('current_sorted_list'));
    } else {
      this.restaurant_list = this.navParams.get('restaurant_list');
    }
    if (localStorage.getItem('allergen_options') != null){
      this.readAllergenValues();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllergensFilterPage');

  }

  ionViewCanLeave(){
    this.navCtrl.setRoot(this.navCtrl.getPrevious()).then(
      () => { console.log("Set root"); }
    ).catch(
      () => { console.log("NOP")}
    );
  }

  private generateArrayWithCheckedOptions(){
    let checked_options = [];
    if (this.celery_checkbox_option) {
      checked_options.push("celery");
    }
    if (this.crustacean_checkbox_option) {
      checked_options.push("crustacean");
    }
    if (this.egg_checkbox_option) {
      checked_options.push("egg");
    }
    if (this.fish_checkbox_option) {
      checked_options.push("fish");
    }
    if (this.lupin_checkbox_option) {
      checked_options.push("lupin");
    }
    if (this.milk_checkbox_option) {
      checked_options.push("milk");
    }
    if (this.mollusc_checkbox_option) {
      checked_options.push("mollusc");
    }
    if (this.mustard_checkbox_option) {
      checked_options.push("mustard");
    }
    if (this.nuts_checkbox_option) {
      checked_options.push("nuts");
    }
    if (this.peanuts_checkbox_option) {
      checked_options.push("peanuts");
    }
    if (this.sasame_checkbox_option) {
      checked_options.push("sesame");
    }
    if (this.soya_checkbox_option) {
      checked_options.push("soya");
    }
    if (this.sulphur_checkbox_option) {
      checked_options.push("sulphur");
    }
    if (this.wheat_checkbox_option) {
      checked_options.push("wheat");
    }
    return checked_options;
  }

  applyFilter() {
    let filtered_restaurant_list = [];
    let checkedOptions = this.generateArrayWithCheckedOptions();
    if (checkedOptions.length == 0) return this.restaurant_list;
    for (let restaurant of this.restaurant_list){
      if (!restaurant.value.allergens.some(r=> checkedOptions.indexOf(r) >= 0)){
        filtered_restaurant_list.push(restaurant);
      }
    }
    localStorage.setItem('current_sorted_list', JSON.stringify(filtered_restaurant_list));
    localStorage.setItem('allergen_options', JSON.stringify(checkedOptions));
    console.log(JSON.parse(localStorage.getItem('allergen_option')));
    this.navCtrl.push(RestaurantListPage,{restaurant_list:filtered_restaurant_list});
  }

  private readAllergenValues() {
    let checked_options = [];
    checked_options = JSON.parse(localStorage.getItem('allergen_options'));
    console.log(JSON.parse(localStorage.getItem('allergen_options')))
    if (checked_options.indexOf('celery') > -1){
      this.celery_checkbox_option = true;
    }
    if (checked_options.indexOf('crustacean') > -1){
      this.crustacean_checkbox_option = true;
    }
    if (checked_options.indexOf('egg') > -1){
      this.egg_checkbox_option = true;
    }
    if (checked_options.indexOf('fish') > -1){
      this.fish_checkbox_option = true;
    }
    if (checked_options.indexOf('lupin') > -1){
      this.lupin_checkbox_option = true;
    }
    if (checked_options.indexOf('milk') > -1){
      this.milk_checkbox_option = true;
    }
    if (checked_options.indexOf('mollusc') > -1){
      this.mollusc_checkbox_option = true;
    }
    if (checked_options.indexOf('mustard') > -1){
      this.mustard_checkbox_option = true;
    }
    if (checked_options.indexOf('nuts') > -1){
      this.nuts_checkbox_option = true;
    }
    if (checked_options.indexOf('peanuts') > -1){
      this.peanuts_checkbox_option = true;
    }
    if (checked_options.indexOf('sesame') > -1){
      this.sasame_checkbox_option = true;
    }
    if (checked_options.indexOf('sulphur') > -1){
      this.sulphur_checkbox_option = true;
    }
    if (checked_options.indexOf('wheat') > -1){
      this.wheat_checkbox_option = true;
    }
  }
}

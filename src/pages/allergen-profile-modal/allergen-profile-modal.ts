import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProfileProvider} from "../../providers/profile/profile";
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the AllergenProfileModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-allergen-profile-modal',
  templateUrl: 'allergen-profile-modal.html',
})
export class AllergenProfileModalPage {

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
  profileName: any;
  profile: any;
  operation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public profileProvider: ProfileProvider,
              public viewController: ViewController) {
    this.profile = this.navParams.get("profile");
    this.operation = this.navParams.get("operation");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllergenProfileModalPage');
    if (this.operation == "edit"){
      this.setCheckedOptions();
      this.profileName = this.navParams.get('profileName')
    } else {
      this.profileName = "New profile"
    }
  }

  public closeModal(){
    this.viewController.dismiss();
  }

  save() {
    this.profile.allergensProfile.push({
      "name" : this.profileName,
      "allergens" : this.getCheckedOptions()
    });
    this.profileProvider.setProfile(this.profile).then(
      () => {
        this.closeModal();
      }
    ).catch(
      () =>{
        this.closeModal();
      }
    );
  }
  getCheckedOptions(){
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

  setCheckedOptions() {
    let checked_options = [];
    for (let profile of this.profile.allergensProfile) {
      if (profile.name == this.profileName){
        checked_options = profile.allergens;
        break;
      }
    }

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

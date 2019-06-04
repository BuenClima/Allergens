import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

/**
 * Generated class for the DishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dish',
  templateUrl: 'dish.html',
})
export class DishPage {

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
  showa:boolean = false;

  dish:any;
  restaurant_name: any;
  show: any;
  activated: any = -1;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.dish = navParams.get('dish');
    this.restaurant_name = navParams.get('restaurant_name');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishPage');
  }


  showIngredients() {
    this.show = this.show != true;
    this.showa = this.showa != true;
    if (this.activated != 1){
      this.activated = 1
    }  else {
      this.activated = 0
    }
  }

  showInfoBubble(allergen: string) {
    const toast = this.toastCtrl.create({
      message: allergen,
      duration: 1000,
      position: "top",
      dismissOnPageChange: true,
      showCloseButton: false,
      closeButtonText: "Ok",
      cssClass: "test"
    });
    toast.present();
  }
}

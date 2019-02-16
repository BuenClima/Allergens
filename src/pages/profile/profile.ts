import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import {ProfileProvider} from "../../providers/profile/profile";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: any;
  credentials: any;
  profile:any;
  token:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public auth: AuthProvider, public alertCtrl: AlertController,
              public profileProvider: ProfileProvider) {
    this.credentials = {email: '', password: ''};
    this.profile = {created: false, name:'', allergens: {}, restaurantNotifications: ''};
    if (localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
    } else {
      this.token = "";
    }
  }

  ionViewDidLoad() {
    this.user = this.auth.getUser();
  }

  login() {
    this.auth.loginUser(this.credentials.email, this.credentials.password)
      .then((user) => {
        this.user = user;
        this.profileProvider.getProfile().then((profileSnapshot) => {
          this.profile = profileSnapshot;
          console.log(this.profile);
        }).catch((error) => {
          console.log(error);
        });
        if (!this.profile.created) {
          this.profile.created = true;
          this.profile = this.profileProvider.setProfile(this.profile);
        }
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Dimiss']
        });
        alert.present();
      });
  }

  signin() {
    this.auth.registerUser(this.credentials.email, this.credentials.password)
      .then((res) => {
        console.log("YES")
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Dimiss']
        });
        alert.present();
      });
  }

  recoverPassword() {
    this.auth.recoverPassword().then((res) => {
      console.log("YES")
    })
      .catch((error) => {
        console.log(error)
      });
  }

  logout(){
    let alert = this.alertCtrl.create({
      title: 'Confirm logout',
      message: 'Do you want to leave Allergens App?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Logout clicked');
            this.auth.logout();
            this.user = null;
          }
        }
      ]
    });
    alert.present();
  }

  updateUserProfile() {
    this.profileProvider.setProfile(this.profile)
      .then((res) => {
        let alert = this.alertCtrl.create({
          title: 'Updated!',
          subTitle: 'Successfully updated profile',
          buttons: ['OK!']
        });
        alert.present();
      })
      .catch(err => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Dimiss']
        });
        alert.present();
      });
  }
}

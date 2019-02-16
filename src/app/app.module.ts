import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { RestaurantPage } from "../pages/restaurant/restaurant";
import {RestaurantListPage} from "../pages/restaurant-list/restaurant-list";
import { AllergensFilterPage } from "../pages/allergens-filter/allergens-filter";
import {FilterPage} from "../pages/filter/filter";
import { MapPage } from "../pages/map/map";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from  'angularfire2/auth';
import { RestaurantProvider } from '../providers/restaurant/restaurant';
import { HttpClientModule } from "@angular/common/http";


import {GoogleMaps} from '@ionic-native/google-maps';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';

import { IonicStorageModule } from "@ionic/storage";
import { StorageProvider } from '../providers/storage/storage';
import { LocationTrackerProvider } from '../providers/location-tracker/location-tracker';
import { StarRatingModule } from "ionic3-star-rating";
import { NativeStorage } from "@ionic-native/native-storage";

import { MapComponent } from '../components/map/map';
import { FilterProvider } from '../providers/filter/filter';
import { DishesProvider } from '../providers/dishes/dishes';
import { DishPage } from "../pages/dish/dish";
import { ProfilePage } from "../pages/profile/profile";

import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';
import { NotificationsProvider } from '../providers/notifications/notifications';
import {AngularFireMessagingModule} from 'angularfire2/messaging';
import 'firebase/messaging';
const firebaseConfig = {
  apiKey: "AIzaSyDksvJCJD1BKucYdDH4BGA13VsXOvy6j2U",
  authDomain: "allergen-8c1d4.firebaseapp.com",
  databaseURL: "https://allergen-8c1d4.firebaseio.com",
  projectId: "allergen-8c1d4",
  storageBucket: "allergen-8c1d4.appspot.com",
  messagingSenderId: "618924967273"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    RestaurantPage,
    RestaurantListPage,
    AllergensFilterPage,
    FilterPage,
    MapComponent,
    MapPage,
    DishPage,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig,'allergen'),
    AngularFireDatabaseModule,
    HttpClientModule,
    StarRatingModule,
    AngularFireAuthModule,
    AngularFireMessagingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    RestaurantPage,
    RestaurantListPage,
    AllergensFilterPage,
    FilterPage,
    MapPage,
    DishPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestaurantProvider,
    GoogleMaps,
    BackgroundGeolocation,
    StorageProvider,
    LocationTrackerProvider,
    Geolocation,
    NativeStorage,
    FilterProvider,
    DishesProvider,
    AuthProvider,
    ProfileProvider,
    ProfileProvider,
    NotificationsProvider,
  ]
})
export class AppModule {}

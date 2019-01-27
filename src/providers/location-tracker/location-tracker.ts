import { Injectable } from '@angular/core';
import {BackgroundGeolocation, BackgroundGeolocationConfig} from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';



@Injectable()
export class LocationTrackerProvider {


  public watch: any;
  public lat: number = 0;
  public lng: number = 0;


  constructor(public backgroundGeolocation: BackgroundGeolocation,
              public geolocation: Geolocation) {
    console.log('Hello LocationTrackerProvider Provider');
  }

  public startTracking() {

    let config : BackgroundGeolocationConfig = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {

      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);

        this.lat = location.latitude;
        this.lng = location.longitude;

    }, (err) => {
      console.log(err);
    });

    this.backgroundGeolocation.start();

    // Background tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      console.log(position);

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

    });
  }

  public stopTracking() {
    console.log('stopTracking');

    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();
  }

}

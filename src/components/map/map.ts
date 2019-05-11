import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  Environment, GoogleMap,
  GoogleMapOptions,
  GoogleMaps,
  GoogleMapsEvent, HtmlInfoWindow,
  Marker,
  MarkerCluster
} from "@ionic-native/google-maps";
import {NavController} from "ionic-angular";
import {RestaurantPage} from "../../pages/restaurant/restaurant";
const browserMapsAPIKey = 'AIzaSyBWjg2YgCConFzw59sqUi34nsnLNygVEZU';

@Component({
  selector: 'app-custom-map',
  templateUrl: 'map.html'
})
export class MapComponent {

  map: GoogleMap;
  @Input('position')
  position:any;

  // @Output('restaurant_name')
  // restaurant_name:EventEmitter<string> = new EventEmitter<string>();

  constructor(public navCtrl: NavController) {
    console.log("OK");
    console.log(this.position);
  }

  ngAfterViewInit(){
    this.loadMap();
  }


  loadMap() {
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': browserMapsAPIKey,
      'API_KEY_FOR_BROWSER_DEBUG': ''
    });
    Environment.setBackgroundColor("#EFEFEF");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: this.position != null? Number(this.position.lat):28.1042,
          lng: this.position != null? Number(this.position.lng):-15.41698
        },
        zoom: 18,
        tilt: 30
      },
      styles : [
        { "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            { "visibility": "off" }
          ]
        }
      ]
    };
    this.map = GoogleMaps.create('map-canvas', mapOptions);
    let clicked = false;
    this.map.addMarkerCluster({
      markers: [{title: "Que leche!", position:{lat: 28.1042, lng: -15.41698},allergens:["celery","crustacean","egg", "fish", "soya"]},
        {title: "La Perrachica", position:{lat: 28.104070, lng: -15.416070},allergens:["celery","wheat","egg", "lupin", "mustard", "sesame"]},
        {title: "Perinqué", position:{lat: 28.103430, lng: -15.414180},allergens:["egg","milk","egg", "mollusc", "nuts", "peanuts"]},
        {title: "Scooter's Vegueta-Triana", position:{lat: 28.102520, lng: -15.415360},allergens:["sulphur","wheat","fish", "mollusc", "soya"]},
        {title: "Los 5 Sentidos", position:{lat: 28.102200, lng: -15.414320},allergens:["celery","sesame","lupin", "milk"]},
        {title: "El Vasco de Vegueta", position:{lat: 28.101970, lng: -15.414600},allergens:["wheat","crustacean","egg", "fish", "soya", "milk", "celery", "sesame"]},
        {title: "El Rifeño", position:{lat: 28.102060, lng: -15.414090},allergens:[ "soya", "milk", "celery"]},
        {title: "La Vegueta de Colón", position:{lat: 28.101540, lng: -15.414690},allergens:[ "wheat", "fish", "mollusc"]},
        {title: "La Taberna de El Monje", position:{lat: 28.100430, lng: -15.414300},allergens:[ "gluten", "soya", "mustard"]},
        {title: "La Hierba Luisa", position:{lat: 28.101200, lng: -15.412610},allergens:[ "wheat", "crustacean", "egg", "fish", "soya"]},
        {title: "Restaurante Casa Montesdeoca", position:{lat: 28.101650, lng: -15.413470},allergens:["fish", "soya"]},
        {title: "Tasca El Canalla De Vegueta", position:{lat: 28.101320, lng: -15.415420},allergens:["crustacean", "egg", "fish"]},
        {title: "Bistro La Champiñoneria", position:{lat: 28.101620, lng: -15.412890},allergens:["egg", "fish","mustard"]},
        {title: "Trés Jolie", position:{lat: 28.101880, lng: -15.413190},allergens:[ "fish", "mollusc", "wheat", "nuts", "peanuts"]},
        {title: "Marsala", position:{lat: 28.101970, lng: -15.413310},allergens:["wheat", "nuts", "peanuts", "sesame"]},
        {title: "Tasca La Piedra Vegueta", position:{lat: 28.101550, lng: -15.412850},allergens:["wheat", "nuts", "peanuts", "sesame"]},
      ],
      icons: [
        {min:3, max: 9,
          url: ".assets/imgs/allergens/celery.png",
          label: {color: "white"}},
        {min: 10,
          url: ".assets/imgs/allergens/wheat.png",
          label: {color: "white"}}
      ]
    }).then((markerCluster: MarkerCluster) => {
      markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params)=>{
        let marker: Marker = params[1];
        let htmlInfoWindow = new HtmlInfoWindow();
        let frame: HTMLElement = document.createElement('div');
        let frameHtml = [];
        let allergens = marker.get("allergens");
        for (let allergen of allergens){
          if(allergen == "celery"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/celery.png">');
          }
          if (allergen == "crustacean"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/crustacean.png">');
          }
          if (allergen == "egg"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/egg.png">');
          }
          if (allergen == "fish"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/fish.png">');
          }
          if (allergen == "lupin"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/lupin.png">');
          }
          if (allergen == "milk"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/milk.png">');
          }
          if (allergen == "mollusc"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/mollusc.png">');
          }
          if (allergen == "mustard"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/mustard.png">');
          }
          if (allergen == "nuts"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/nuts.png">');
          }
          if (allergen == "peanuts"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/peanuts.png">');
          }
          if (allergen == "soya"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/soya.png">');
          }
          if (allergen == "sesame"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/sesame.png">');
          }
          if (allergen == "sulphur"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/sulphur.png">');
          }
          if (allergen == "wheat"){
            frameHtml.push('<img style="width: 25px;height: 25px;" src="assets/imgs/allergens/wheat.png">');
          }
        }
        let buttonsHtml = ['<button style="font-size: 1.4em;  background-color: #6dc0ec; /* Blue */\n' +
        '  border: none;\n' +
        '  color: white;\n' +
        '  padding: 5px 5px;\n' +
        '  text-align: center;\n' +
        '  text-decoration: none;\n' +
        '  display: inline-block;">Visit</button>']
        frame.innerHTML = [
          '<h2>'+marker.getTitle()+'</h2>',
        ].concat(frameHtml).concat(['<br>']).concat(buttonsHtml).join("");
        frame.getElementsByTagName("button")[0].addEventListener("click", () => {
          this.navCtrl.push(RestaurantPage, {restaurant_name: marker.getTitle()});
        });
        // this.map.moveCamera({
        //   target:{lat: marker.getPosition().lat +Number(90/Math.pow(2,this.map.getCameraPosition().zoom)),
        //           lng: marker.getPosition().lng
        //   },
        //   zoom:this.map.getCameraPosition().zoom
        // }).then(()=>{console.log("OK")});
        // this.map.animateCamera({
        //   target:{lat: marker.getPosition().lat +Number(90/Math.pow(2,this.map.getCameraPosition().zoom)),
        //     lng: marker.getPosition().lng
        //   },
        //   zoom:this.map.getCameraPosition().zoom
        // }).then(()=>{console.log("OK")});
        htmlInfoWindow.setContent(frame,{width: "200px", height:"125px"});
        htmlInfoWindow.open(marker);
        console.log("OK");
      })
    });
  }

}

import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { DishesProvider } from "../dishes/dishes";


@Injectable()
export class RestaurantProvider {


  constructor(public afDB: AngularFireDatabase,
              public dishesProvider: DishesProvider) {
  }

  createRestaurantsOnFirebase(){
    let restaurants = RestaurantProvider.getRestaurantsDummyData();
    let i = 1;
    for (let restaurant of restaurants.restaurants){
      this.afDB.database.ref('restaurants/'+ i).set(restaurant);
      this.dishesProvider.createDishesOnFirebase(i);
      i++;
    }
  }

  getRestaurants(){
    return this.afDB.database.ref('restaurants/').once('value').then(
      (restaurantsSnapshot) => { return restaurantsSnapshot.val(); }
    )
  }

  // getTopRestaurants(max){
  //   this.getRestaurants().then((restaurantsSnapshot) => {
  //     let restaurantList = Object.keys(restaurantsSnapshot).map(key => ({type: key, value: restaurantsSnapshot[key]}));
  //     restaurantList.sort((a,b) => (a.value.rank > b.value.rank)? 1:(b.value.rank < a.value.rank)? -1:0);
  //     //console.log(restaurantList.slice(0,max+1))
  //     return restaurantList.slice(0,max+1);
  //   });
  // }


  static getRestaurantsDummyData(){
    return {
      "restaurants" : [
        {
          "id" : "1",
          "restaurantName": "Que leche",
          "rating" : 4.7,
          "reviews" : 143,
          "allergens": ["celery", "crustacean", "egg", "fish", "soya"],
          "price" : "$",
          "openTime": "13:30",
          "closeTime" : "23:00",
          "takeOut" : true,
          "cuisineType": ["Popular", "local"],
          "latitude": 28.104200,
          "longitude" : -15.416980,
          "rank" : 16,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipOeUnKrv2Wk7eYaOjgRv_eUNLp9tBDhhmoDqOoX=w240-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "2",
          "restaurantName": "La Perrachica",
          "rating" : 4.3,
          "reviews" : 171,
          "allergens": ["celery", "wheat", "egg","lupin", "mustard"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:00",
          "takeOut" : true,
          "cuisineType": ["Popular", "local", "fast food"],
          "latitude": 28.104070,
          "longitude" : -15.416070,
          "rank" : 16,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipOXitlmD_L1rTKwHgtMiYbi1TsStHfbGQWavYwn=w284-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "3",
          "restaurantName": "Perinqué",
          "rating" : 4.7,
          "reviews" : 45,
          "allergens": ["egg", "milk", "mollusc", "nuts", "peanuts"],
          "price" : "$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Italian"],
          "latitude": 28.103430,
          "longitude" : -15.414180,
          "rank" : 14,
          "imageUrl" : "null",
          "city" : "Las Palmas"
        },
        {
          "id" : "4",
          "restaurantName": "Scooter's",
          "rating" : 4.0,
          "reviews" : 53,
          "allergens": ["sulphur", "wheat", "mollusc", "fish", "soya"],
          "price" : "$$",
          "openTime": "12:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Italian", "pizza"],
          "latitude": 28.102520,
          "longitude" : -15.415360,
          "rank" : 13,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipP_eyLKt4vzCaVFE7fbS1AIqQbVzGOk-dC-4bsv=w240-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "5",
          "restaurantName": "Los 5 Sentidos",
          "rating" : 4.6,
          "reviews" : 120,
          "allergens": ["celery", "sesame", "lupin", "milk"],
          "price" : "$$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Popular", "local"],
          "latitude": 28.102200,
          "longitude" : -15.414320,
          "rank" : 12,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipNHgle6I0f92L2POAiPBPySMePnh1elDl2i3jxG=w213-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "6",
          "restaurantName": "El Vasco",
          "rating" : 3.7,
          "reviews" : 144,
          "allergens": ["egg", "fish", "milk", "celery", "sesame"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Popular", "Local", "Wok"],
          "latitude": 28.101970,
          "longitude" : -15.414600,
          "rank" : 11,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipNj524cIokFlFDzgihk_LBy_aVdvdyKbd4dWG-n=w213-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "7",
          "restaurantName": "El Rifeño",
          "rating" : 4.4,
          "reviews" : 188,
          "allergens": ["soya", "milk", "celery"],
          "price" : "$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Popular", "Local"],
          "latitude": 28.102060,
          "longitude" : -15.414090,
          "rank" : 10,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipMoq82BPDPghIHnM-dMd9U-SFfBm7qdCEZ9PKs=w213-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "8",
          "restaurantName": "La Vegueta de Colón",
          "rating" : 4.4,
          "reviews" : 60,
          "allergens": ["wheat", "fish", "mollusc"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Chinese"],
          "latitude": 28.101540,
          "longitude" : -15.414690,
          "rank" : 9,
          "imageUrl" : "https://lh3.googleusercontent.com/p/AF1QipNj524cIokFlFDzgihk_LBy_aVdvdyKbd4dWG-n=s1600-h1600",
          "city" : "Las Palmas"
        },
        {
          "id" : "9",
          "restaurantName": "La Taberna de El Monje",
          "rating" : 4.1,
          "reviews" : 179,
          "allergens": ["gluten", "soya", "mustard"],
          "price" : "$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Local"],
          "latitude": 28.100430,
          "longitude" : -15.414300,
          "rank" : 8,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipOXdnnbD7En9cqrRKkglUxLhh0cKUsGoIHRSe_1=w203-h114-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "10",
          "restaurantName": "La Hierba Luisa",
          "rating" : 4.5,
          "reviews" : 199,
          "allergens": ["wheat", "crustacean", "egg", "fish", "soya"],
          "price" : "$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Italian", "Local"],
          "latitude": 28.101200,
          "longitude" : -15.412610,
          "rank" : 7,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipOneHL4nZqGi922s062yf0Kj5E-tE7MaWjZo9Et=w119-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "11",
          "restaurantName": "Casa Montesdeoca",
          "rating" : 3.9,
          "reviews" : 109,
          "allergens": ["fish", "soya"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Italian", "Local"],
          "latitude": 28.101650,
          "longitude" : -15.413470,
          "rank" : 6,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipPdGx6BmkbmcIo-n_sxFF9b11rMy_FVixzO-5d2=w105-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "12",
          "restaurantName": "El Canalla",
          "rating" : 4.1,
          "reviews" : 475,
          "allergens": ["crustacean", "egg", "fish"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : true,
          "cuisineType": ["Tapas", "Local"],
          "latitude": 28.101320,
          "longitude" : -15.415420,
          "rank" : 5,
          "imageUrl" : "http://www.comerciocanarias.com/assets/comercios/tasca-el-canalla-de-vegueta_galeria_2664_56945.jpg",
          "city" : "Las Palmas"
        },
        {
          "id" : "13",
          "restaurantName": "La Champiñoneria",
          "rating" : 4.3,
          "reviews" : 312,
          "allergens": ["egg", "fish","mustard"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : false,
          "cuisineType": ["Tapas", "Bistro"],
          "latitude": 28.101620,
          "longitude" : -15.412890,
          "rank" : 4,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipPeJJEjI28yKdSFNOJ-5W1OyYTQdM4zMv_IqFLi=w215-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "14",
          "restaurantName": "Trés Jolie",
          "rating" : 4.3,
          "reviews" : 148,
          "allergens": [ "fish", "mollusc", "wheat", "nuts", "peanuts"],
          "price" : "$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : false,
          "cuisineType": ["Bistro"],
          "latitude": 28.101880,
          "longitude" : -15.413190,
          "rank" : 3,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipMw8Q2drO6TWMGjApJkHTO0zHiNEoPu0NAdj5EZ=w320-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "15",
          "restaurantName": "Marsala",
          "rating" : 4.1,
          "reviews" : 128,
          "allergens": ["wheat", "nuts", "peanuts", "sesame"],
          "price" : "$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : false,
          "cuisineType": ["Tapas", "Local"],
          "latitude": 28.101970,
          "longitude" : -15.413310,
          "rank" : 2,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipPnaIjft_MGyIy6f5nXKS2KQFwp3f7nQsa2-mXD=w89-h160-k-no",
          "city" : "Las Palmas"
        },
        {
          "id" : "16",
          "restaurantName": "Tasca La Piedra",
          "rating" : 4.3,
          "reviews" : 66,
          "allergens": ["wheat", "nuts", "peanuts", "sesame"],
          "price" : "$$",
          "openTime": "13:00",
          "closeTime" : "23:30",
          "takeOut" : false,
          "cuisineType": ["Tapas", "Local"],
          "latitude": 28.101550,
          "longitude" : -15.412850,
          "rank" : 1,
          "imageUrl" : "https://lh5.googleusercontent.com/p/AF1QipOuOnue_dbcdp-K0a0BpnviB_5LwjOQWhzIMDcz=w120-h160-k-no",
          "city" : "Las Palmas"
        }
      ]
    };
  }
}

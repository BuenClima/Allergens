import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DishesProvider {

  constructor(public afDB: AngularFireDatabase) {
  }

  public createDishesOnFirebase(restaurant_id){
    let list = DishesProvider.getDummyDataDishes(restaurant_id);
    let i = 0;
    for (let dish of list.dishes){
      this.afDB.database.ref('restaurants/'+ restaurant_id +'/dishes/'+i)
        .set(dish);
      i++;
    }
  }

  public getDishesFromARestaurant(restaurant_id){
    return this.afDB.database.ref('restaurants/'+restaurant_id+'/dishes').once('value').then(
      (dishesSnapshot) => {
        return dishesSnapshot.val(); }
    )
  }

  /*
    Dummy dish base
  {
    "category" : "",
    "allergens" : [],
    "calories" : "",
    "ingredients" : [],
    "name" : "",
    "price" : 0,
    "imageURL" : ""
  }
  */

  static getDummyDataDishes(restaurant_id){
    switch (restaurant_id) {
      default :
        return {
          "dishes" : [
            {
              "category" : "dinner",
              "allergens" : ["celery", "wheat"],
              "calories" : "300",
              "ingredients" : [
                "flour",
                "pepper",
                "garlic",
                "salt",
                "chicken wings",
                "butter"
              ],
              "name" : "Buffalo chicken wings",
              "price" : 7,
              "imageURL" : "https://images.media-allrecipes.com/userphotos/720x405/1132784.jpg"
            },
            {
              "category" : "dinner",
              "allergens" : ["soya"],
              "calories" : "150",
              "ingredients" : [
                "soya",
                "tomatoes",
                "mozzarella",
                "olive oil",
                "steak",
                "garlic",
                "salt",
                "vinegar",
                "lettuce mix"
              ],
              "name" : "Fresh salad",
              "price" : 5,
              "imageURL" : "https://images.media-allrecipes.com/userphotos/720x405/1035145.jpg"
            },
            {
              "category" : "breakfast",
              "allergens" : ["celery"],
              "calories" : "200",
              "ingredients" : [
                "flour",
                "baking powder",
                "baking soda",
                "salt",
                "buttermilk",
                "canola oil"
              ],
              "name" : "Waffles",
              "price" : 3.99,
              "imageURL" : "https://www.tasteofhome.com/wp-content/uploads/2018/05/Golden-Buttermilk-Waffles_EXPS_BMZ17_23050_D09_30_7b-696x696.jpg"
            },
            {
              "category" : "breakfast",
              "allergens" : ["celery", "egg"],
              "calories" : "350",
              "ingredients" : [
                "flour",
                "baking powder",
                "baking soda",
                "salt",
                "eggs",
                "butter",
                "vanilla"
              ],
              "name" : "Pancakes",
              "price" : 2.5,
              "imageURL" : "https://www.tasteofhome.com/wp-content/uploads/2018/12/The-Best-Ever-Pancakes_EXPS_BMZ19_233704_E12_04_5b-696x696.jpg"
            },
            {
              "category" : "breakfast",
              "allergens" : ["egg", "celery"],
              "calories" : "100",
              "ingredients" : [
                "flour",
                "baking powder",
                "baking soda",
                "salt",
                "cinnamon",
                "nutmeg",
                "egg",
                "milk"
              ],
              "name" : "Muffins",
              "price" : 1.5,
              "imageURL" : "https://www.tasteofhome.com/wp-content/uploads/2017/10/exps7496_HB143427B07_31_2b-696x696.jpg"
            },
            {
              "category" : "lunch",
              "allergens" : ["fish", "crustacean", "soya"],
              "calories" : "400",
              "ingredients" : [
                "soya",
                "salmon",
                "butter",
                "crab",
                "anise",
                "wine",
                "milk",
                "flour"
              ],
              "name" : "Fish pie",
              "price" : 8,
              "imageURL" : "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/10/next-level-fish-pie.jpg?itok=N7g1Nc3c"
            },
            {
              "category" : "lunch",
              "allergens" : ["celery", "wheat"],
              "calories" : "300",
              "ingredients" : [
                "bacon",
                "carrots",
                "celery",
                "garlic",
                "beef",
                "olive oil"
              ],
              "name" : "Bolognese Spaghetti",
              "price" : 7,
              "imageURL" : "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/the-best-spaghetti-bolognese.jpg?itok=PH6AqY-g"
            },
            {
              "category" : "lunch",
              "allergens" : ["celery"],
              "calories" : "300",
              "ingredients" : [
                "chicken",
                "garlic",
                "ginger",
                "ground cumin",
                "ground coriander",
                "chili",
                "tomatoes"
              ],
              "name" : "Chicken Mandra",
              "price" : 8,
              "imageURL" : "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/11/chicken-madras.jpg?itok=szsRbN2-"
            }
          ]
        };
    }

  }
}

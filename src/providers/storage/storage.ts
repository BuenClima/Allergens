import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(public http: HttpClient) {
  }

  public static readValue(key){
    return localStorage.getItem(key);
  }

  public static writeValues(params){
    localStorage.setItem(params.key, params.value);
  }

}

import { Injectable } from '@angular/core';
import {AuthProvider} from "../auth/auth";
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class ProfileProvider {

  constructor(public afDB: AngularFireDatabase, public auth: AuthProvider) {
  }

  setProfile(profile){
    return this.afDB.database.ref('profiles/'+this.auth.getUser().uid).set(profile)
      .then(() => {
        console.log("Successfully created profile for user " + this.auth.getUser().uid)
      });
  }

  getProfile(){
    return this.afDB.database.ref('profiles/'+this.auth.getUser().uid).once(
      'value').then((profileSnapshot) => {
      return profileSnapshot.val();
    });
  }

}

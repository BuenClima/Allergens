import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth) {
  }

  registerUser(email:string, password:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("YES")
      })
      .catch(err => Promise.reject(err))
  }


  loginUser(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user => Promise.resolve(user))
      .catch(err => Promise.reject(err))
  }
  get Session(){
    return this.afAuth.authState;
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{});
  }

  getUser(){
    return this.afAuth.auth.currentUser;
  }

  recoverPassword(){
    return this.afAuth.auth.sendPasswordResetEmail(this.getUser().email).then(
      () => {
        console.log("Email sent")
      }
    )
      .catch((error) => console.log(error))
  }

}

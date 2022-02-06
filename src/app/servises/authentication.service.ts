import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence,browserLocalPersistence } from "firebase/auth";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  time: number = 0;
  interval:any;
  
  constructor(
    public afAuth: AngularFireAuth // Inject Firebase auth service
  ) { 
  }
  getLogInform(){
    return this.afAuth.user ;
  }
  // Sign up with email/password
  SignUp(email:string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with email/password
  SignIn(email:string, password:string) {
    const auth = getAuth();
    return setPersistence( auth, browserLocalPersistence).
    then(()=>{this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("התחבר "+"בהצלחה")
      }).catch((error) => {
        window.alert("לא התחבר")
        
      });
    });
  }
  // LogOut
  LogOut():Promise<void>{
   return  this.afAuth.signOut();
  }
}

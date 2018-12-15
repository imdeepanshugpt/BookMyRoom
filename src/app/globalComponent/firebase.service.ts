import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './local-storage.service';
import { MatDialogRef } from '@angular/material';
import { LoginModalComponent } from '../modules/auth/login/modals/login-modal/login-modal.component';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  dialogRef;
  signedInWithGoogle: boolean;
  constructor(
    public afAuth: AngularFireAuth,
    public localStorageService: LocalStorageService,
    public router: Router
  ) { }

  setDialogRef(dialogRef: MatDialogRef<LoginModalComponent>) {
    this.dialogRef = dialogRef;
  }
  getDialogRef() {
    return this.dialogRef;
  }

  signup(email: string, password: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }
  login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      this.signedInWithGoogle = true;
      return this.afAuth.auth
      .signInWithPopup(provider);
  }

  googleLogout() {
    if (this.signedInWithGoogle) {
      this.afAuth.auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
    } else {
      firebase.auth().signOut()
      .then(
        data => console.log(data)
      )
      .catch(
        err => console.log(err)
      );
    }
    this.localStorageService.clear();
    this.router.navigateByUrl('/home');
  }
}

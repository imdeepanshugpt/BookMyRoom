import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SessionStorageService } from '../../../globalComponent/session-storage.service';
import { LocalStorageService } from '../../../globalComponent/local-storage.service';
import { HttpService } from '../../../globalComponent/http.service';
import { FirebaseService } from '../../../globalComponent/firebase.service';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import * as AuthActions from '../../hotel/hotelStore/auth.actions';
import * as fromAuth from '../../hotel/hotelStore/auth.reducers';
import { AuthState } from '../../hotel/hotelStore/hotelStore.State';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  public invalidCredentials = '';
  public loginForm: FormGroup;
  public isManager = false;

  constructor(
    private httpService: HttpService,
    private firebaseService: FirebaseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private authStore: Store<{ auth: AuthState }>,
    private _zone: NgZone
  ) { }

  ngOnInit() {
    if (this.sessionStorageService.getItem('Manager') === 'true') {
      this.isManager = true;
    } else {
      this.isManager = false;
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email,
      Validators.minLength(5), Validators.maxLength(30)]),
      'password': new FormControl(null, [Validators.required, Validators.maxLength(30)])
    });
  }

  login() {
    if (this.loginForm.value.email === 'admin@bookmyroom.com') {
      this.adminlogin();
    } else {
      this.loginFb();
    }
  }

  adminlogin() {
    const admindetails = {
      adminEmail: this.loginForm.value.email,
      adminPassword: this.loginForm.value.password
    };
    console.log(admindetails);

    this.httpService.post('admin/adminlogin', admindetails)
      .subscribe(
        response => {
          console.log(response);
          if (response['status'] === 'invalidCredentials') {
            this.invalidCredentials = 'Invalid email or password ';
          } else {
            console.log(response['token']);
            const admin = {
              token: response['token'],
              isAuthenticated: true,
              name: 'admin'
            };
            this.localStorageService.setItem('admin', JSON.stringify(admin.token));
            this.localStorageService.setItem('name', 'ADMIN');
            this.authStore.dispatch(new AuthActions.SignInAdmin);
            this.router.navigate(['/admin']);
            this.firebaseService.getDialogRef().close();
          }
        },
        error => {
          this.invalidCredentials = 'Invalid email or password ';
        }
      );
  }


  loginFb() {
    this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        res => {
          console.log(res);
          this.httpService.post('customer/get-customer', {
            customerEmail: res.user.email
          })
            .subscribe(
              result => {
                if (result['message'] === 'OK' && result['data']) {
                  this.snackBar.open('You are signed in.', null, {
                    duration: 2000,
                  });
                  this.localStorageService.setItem('name', result['data'].customerName);
                  this.localStorageService.setItem('email', res.user.email);
                  this.localStorageService.setItem('refresh-token', res.user.refreshToken);

                  this.authStore.dispatch(new AuthActions.Signin({
                    name: this.localStorageService.getItem('name'),
                    email: this.localStorageService.getItem('email')
                  }));
                  this.firebaseService.getDialogRef().close();
                }
              }
            );
        }
      )
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.snackBar.open(errorMessage, null, {
          duration: 2000,
        });

      });
    this.firebaseService.getDialogRef().close();
  }
  googleSignIn() {
    this.firebaseService.googleLogin()
      .then(
        res => {
          this.firebaseService.getDialogRef().close();
          this.localStorageService.setItem('name', res.user.displayName);
          this.localStorageService.setItem('email', res.user.email);
          this.localStorageService.setItem('refresh-token', res.user.refreshToken);
          this.httpService.post('customer/get-customer',
            { customerEmail: this.localStorageService.getItem('email') })
            .subscribe(
              result => {
                if (result['data'] && res.user) {
                  this._zone.run(() => {
                    this.snackBar.open('You are signed in.', null, {
                      duration: 2000,
                    });
                    this.authStore.dispatch(new AuthActions.Signin({
                      name: this.localStorageService.getItem('name'),
                      email: this.localStorageService.getItem('email')
                    }));
                  }
                  );
                } else {
                  this._zone.run(() => {
                    this.router.navigateByUrl('register');
                  });
                }
              }
            );
        }
      )
      .catch(
        error => this.snackBar.open(error.message, null, {
          duration: 2000,
        })
      );
  }

  loginManager() {
    this.firebaseService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then(
        res => {
          this.httpService.post('manager/getManagerDetails', {
            managerEmail: res.user.email
          })
            .subscribe(
              result => {
                if (result['message'] === 'OK' && result['data'] && result['data']['approvalStatus'] === true) {
                  this.snackBar.open('You are signed in.', null, {
                    duration: 2000,
                  });
                  this.localStorageService.setItem('name', result['data'].managerName);
                  this.localStorageService.setItem('email', res.user.email);
                  this.localStorageService.setItem('subAdmin', res.user.email);
                  this.localStorageService.setItem('Manager', true);
                  this.authStore.dispatch(new AuthActions.Manager());
                  this.authStore.dispatch(new AuthActions.Signin({
                    name: this.localStorageService.getItem('name'),
                    email: this.localStorageService.getItem('email')
                  }));
                  this.firebaseService.getDialogRef().close();
                  this.router.navigate(['/manager']);
                } else {
                  this.snackBar.open('Your request is not approved by Admin', null, {
                    duration: 3000,
                  });
                }

              }
            );
        }
      )
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.snackBar.open(errorMessage, null, {
          duration: 2000,
        });

      });
    this.firebaseService.getDialogRef().close();
  }
}

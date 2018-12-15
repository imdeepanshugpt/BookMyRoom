import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { HttpService } from './globalComponent/http.service';
import { LocalStorageService } from './globalComponent/local-storage.service';
import { AuthState } from './modules/hotel/hotelStore/hotelStore.State';
import * as AuthActions from './modules/hotel/hotelStore/auth.actions';
import * as fromAuth from './modules/hotel/hotelStore/auth.reducers';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Book-my-room';
  readonly VAPID_PUBLIC_KEY = 'BLhKMSmKqPS_nrTkR02A-LgdYCLd2YTVDwHYdeDBDAQOyi7SfxKnM4BcVp5cuVWx48zqrmGAfL6VJwo9QsHKUNY';
  public environmentName = environment.envName;
  constructor(
    private authStore: Store<AuthState>,
    private localStorageService: LocalStorageService,
    private httpService: HttpService,
    private router: Router,
    private swPush: SwPush
  ) { }

  ngOnInit() {
     this.router.navigate(['']);
     if (localStorage.getItem('Manager')) {
      this.authStore.dispatch(new AuthActions.Manager());
      this.authStore.dispatch(new AuthActions.Signin({
        name: this.localStorageService.getItem('name'),
        email: this.localStorageService.getItem('email')
      }));
    }
    if (this.localStorageService.getItem('email')) {
      this.authStore.dispatch(new AuthActions.Signin({
        name: this.localStorageService.getItem('name'),
        email: this.localStorageService.getItem('email')
      }));
    }
    if (localStorage.getItem('admin')) {
      console.log('admin', localStorage.getItem('admin'));
      this.httpService.post('admin/adminAccess', { token: localStorage.getItem('admin') })
        .subscribe((response: { status: string, doc: {} }) => {
          console.log(response);
          if (response.status === 'OK') {
            this.authStore.dispatch(new AuthActions.SignInAdmin);
            this.router.navigate(['/admin']);
          }
        });
    }
  }
  clicked() {
    console.log('clicked');
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log(sub);
        this.httpService.post('subscribe/addSubscriber', sub).subscribe(res => {
          console.log(res);
        });
      })
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}

import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SessionStorageService } from './../../../globalComponent/session-storage.service';
import { hotelRoutes } from './../hotel-routing.module';
import { LocalStorageService } from './../../../globalComponent/local-storage.service';
import { HttpService } from '../../../globalComponent/http.service';
import { FirebaseService } from './../../../globalComponent/firebase.service';
import { State, AuthState } from '../hotelStore/hotelStore.State';
import * as HotelDetailActions from '../hotelStore/hotelDetail.actions';
import { LoginModalComponent } from '../../auth/login/modals/login-modal/login-modal.component';
import * as AuthAction from '../hotelStore/auth.actions';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.scss']
})
export class HotelDetailComponent implements OnInit {

  public hotels: Observable<{ states: State[] }>;
  public eventemitter = new EventEmitter();
  public eveemitter = new EventEmitter();
  public isAuthenticated: Observable<AuthState>;
  public isLoggedIn: Boolean;
  public activate = false;
  public comment = '';
  public reply = '';
  public hotelReg = '';
  public hotelName = '';
  public hotelCity = '';
  public currentRate;
  public oldRate = 0;
  public disable = true;
  public enable1 = false;
  public enable2 = false;
  public average = 0;
  public newReview = [];
  public newReply = [];
  public enableReview = false;
  public booked = false;
  public enableText = false;
  public managerEmail;
  public history;
  public can = false;
  public able = false;
  public email = this.localstorageService.getItem('email');
  public name = this.localstorageService.getItem('name');
  // public role = this.localstorageService.getItem('admin');

  constructor(private httpService: HttpService,
    private router: Router,
    private store: Store<{ hotelViewRed: { states: State[] } }>,
    private authStore: Store<AuthState>,
    private firebaseService: FirebaseService,
    private localstorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.hotels = this.store.select('hotelViewRed');
    this.hotels.subscribe(response => {
      this.hotelReg = response['hotels'][0]['hotelRegistrationNumber'];
      this.oldRate = response['hotels'][0]['hotelAverageRating'];
      this.hotelName = response['hotels'][0]['hotelName'];
      this.managerEmail = response['hotels'][0]['managerEmail'];
    });

    this.isAuthenticated = this.authStore.select('auth');
    this.isAuthenticated.subscribe(
      state => {
        this.isLoggedIn = state.authenticated;
      }
    );

    this.httpService.post('booking/bookinghistory', { customerEmail: localStorage.getItem('email') })
      .subscribe((response) => {
        this.history = response;
        for (let i = 0; i < Object.keys(response).length; i++) {
          if (this.history[i]['hotelRegistrationNumber'] === this.hotelReg) {
            this.can = true;
          }
        }
      });

    // if (this.role) {
    //   this.able = true;
    // } else {
    //   this.able = false;
    // }

    if (this.managerEmail === this.email) {
      this.able = true;
    } else {
      this.able = false;
    }

    console.log(this.managerEmail);
    console.log(this.email);
    console.log(this.able);

  }

  onTypeReview(event: Event) {
    this.comment = (<HTMLInputElement>event.target).value;
  }

  onSubmitReview() {

    if (this.isLoggedIn) {

      if (this.can) {
        this.email = this.localstorageService.getItem('email');
        this.name = this.localstorageService.getItem('name');

        if (this.comment === '') {

          alert('comment cannot be empty');
        } else {

          const payload = {
            customerName: this.name,
            customerEmail: this.email,
            review: this.comment,
            // reply: 'Thank You',
            hotelRegNum: this.hotelReg
          };

          this.httpService.post('hotel/addComment', payload)
            .subscribe(
              (response) => {
                this.httpService.get('hotel/getReviews?regNum=' + this.hotelReg).subscribe((reviewData) => {
                  this.eventemitter.emit(reviewData);
                });
              },
              (error) => { alert('Invalid Comment'); }
            );

          this.comment = '';
          this.activate = true;

          this.eventemitter.subscribe((response) => {
            this.newReview = response['doc'][0]['hotelReviews'];
          });
        }
      } else {
        alert('You should be a booked User');
      }

    } else {
      // alert('You should be a registered user');
      const openComp = this.dialog.open(LoginModalComponent, {});
    }
  }

  onTypeReply(event: Event) {
    this.reply = (<HTMLInputElement>event.target).value;
  }

  onSubmitReply(custName) {

    if (this.reply === '') {

      alert('Data cannot be empty');
    } else {

      const data = {
        hotelRegistrationNumber: this.hotelReg,
        customerName: custName,
        reply: this.reply
      };

      this.httpService.post('hotel/addReply', data)
        .subscribe(
          (response) => {
            console.log(response);
            this.httpService.get('hotel/getReviews?regNum=' + this.hotelReg).subscribe((reviewData) => {
              this.eveemitter.emit(reviewData);
            });
          },
          (error) => { console.log(error); }
        );

      this.reply = '';
      this.activate = true;

      this.eveemitter.subscribe((response) => {
        this.newReply = response['doc'][0]['hotelReviews'];
      });
    }
  }

  onRating(event: Event) {
    this.currentRate = (<HTMLInputElement>event.target).valueAsNumber;
    if ((this.currentRate) === 1 || (this.currentRate) === 2 || (this.currentRate) === 3 || (this.currentRate) === 4
      || (this.currentRate) === 5) {
      this.disable = false;
      this.enableText = false;
    } else {
      this.disable = true;
      this.enableText = true;
    }
  }

  onSubmitRating() {

    if (this.isLoggedIn) {

      if (this.can) {
        this.average = (this.oldRate + this.currentRate) / 2;
        this.average = parseFloat(this.average.toFixed(2));
        const payload = {
          rating: this.average,
          hotelRegNum: this.hotelReg
        };
        this.httpService.post('hotel/addRating', payload)
          .subscribe(
            (response) => {
              console.log(response);
            }
          );
        this.enable2 = true;
        this.currentRate = null;
        this.disable = true;
      } else {
        alert('You should be a booked User');
      }
    } else {
      // alert('You should be a registered user');
      const openComp = this.dialog.open(LoginModalComponent, {});
    }
  }

  onBook() {
    this.authStore.dispatch(new AuthAction.Booked());
    this.router.navigate(['/booking']);
  }

}

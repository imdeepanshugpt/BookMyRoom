import { GlobalHTTPErrorHandler } from '../../globalComponent/global-error-handler/global-http-error-handler';
import { BookingModule } from './booking.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick, async, inject} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BookingRoutingModule, bookingRoutes} from './booking-routing.module';
import { BookingComponent } from './booking/booking.component';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../hotel/hotelStore/hotelStore.State';
import { BookingState } from '../hotel/hotelStore/hotelBooking.State';
import * as HotelsAction from '../hotel/hotelStore/hotelStore.Actions';
import * as HotelBookingAction from '../hotel/hotelStore/hotelBooking.actions';
import { hotelStoreReducers } from '../hotel/hotelStore/hotelStore.reducers';
import { AuthguardService } from '../../globalComponent/authguard.service';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from '../../app.module';

describe('BookingModule', () => {
  let bookingModule: BookingModule;

  beforeEach(() => {
    bookingModule = new BookingModule();
  });

  fit('should create an instance', () => {
    expect(bookingModule).toBeTruthy();
  });
});

describe('Router: BookingModule', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: Store<State>;
  beforeEach(() => {
    let service: AuthguardService;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(bookingRoutes), ToastrModule.forRoot(),
                SharedModule, BookingModule, StoreModule.forRoot(hotelStoreReducers),
                AngularFireModule.initializeApp(firebaseConfig)],
      declarations: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [AuthguardService, GlobalHTTPErrorHandler, ToastrService, AngularFireAuth]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(BookingComponent);
    store = fixture.debugElement.injector.get(Store);
    service = TestBed.get(AuthguardService);
  });
  fit('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));
  it('navigate to "Booking" takes you to Booking Page', fakeAsync(() => {
    router.navigate(['booking']);
    tick(50);
    expect(location.path()).toBe('/booking');
  }));

});

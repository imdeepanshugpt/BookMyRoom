import { firebaseConfig } from '../../app.module';
import { BookingComponent } from '../booking/booking/booking.component';
import { HotelCompareComponent } from './hotel-compare/hotel-compare.component';
import { HotelModule } from './hotel.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { HotelRoutingModule, hotelRoutes } from './hotel-routing.module';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { GlobalHTTPErrorHandler } from '../../globalComponent/global-error-handler/global-http-error-handler';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('HotelModule', () => {
  let hotelModule: HotelModule;

  beforeEach(() => {
    hotelModule = new HotelModule();
  });

  fit('should create an instance', () => {
    expect(hotelModule).toBeTruthy();
  });
});

describe('Router: HotelModule_Compare', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(hotelRoutes),
                SharedModule, HotelModule, ToastrModule.forRoot()],
      declarations: [ BookingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HotelCompareComponent);
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
  fit('navigate to "HotelCompare" takes you to Comparision Page', fakeAsync(() => {
    router.navigate(['compare']);
    tick(50);
    expect(location.path()).toBe('/compare');
  }));
});

describe('Router: HotelModule_Detail', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(hotelRoutes),
                SharedModule, HotelModule, ToastrModule.forRoot(),
                AngularFireModule.initializeApp(firebaseConfig)],
      declarations: [ BookingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [GlobalHTTPErrorHandler,  AngularFireAuth]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HotelDetailComponent);
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
  fit('navigate to "HotelDetail" takes you to HotelDetails Page', fakeAsync(() => {
    router.navigate(['detail']);
    tick(50);
    expect(location.path()).toBe('/detail');
  }));
});

describe('Router: HotelModule_List', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(hotelRoutes),
                SharedModule, HotelModule, ToastrModule.forRoot()],
      declarations: [ BookingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [GlobalHTTPErrorHandler]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HotelListComponent);
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
  fit('navigate to "HotelList" takes you to Display Hotels', fakeAsync(() => {
    router.navigate(['hotel']);
    tick(50);
    expect(location.path()).toBe('/hotel');
  }));
});



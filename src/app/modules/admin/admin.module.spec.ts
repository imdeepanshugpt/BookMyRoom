
import { GlobalHTTPErrorHandler } from '../../globalComponent/global-error-handler/global-http-error-handler';
import { CityStatisticComponent } from './city-statistic/city-statistic.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { APP_BASE_HREF } from '@angular/common';
import { AdminModule } from './admin.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Location} from '@angular/common';
import { TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule, adminRoutes} from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GenerateCouponComponent } from './generate-coupon/generate-coupon.component';
import { UpdateHotelsComponent } from './update-hotels/update-hotels.component';
import { StoreModule,  Store} from '@ngrx/store';
import { State, AuthState} from '../hotel/hotelStore/hotelStore.State';
import * as HotelAction from '../hotel/hotelStore/hotelStore.Actions';
import { hotelStoreReducers } from '../hotel/hotelStore/hotelStore.reducers';
import { hotelViewReducers } from '../hotel/hotelStore/hotelDetail.reducers';
import * as viewHotelAction from '../hotel/hotelStore/hotelDetail.actions';
import { AuthguardadminUpdateService } from '../../globalComponent/authguard.adminUpdate.service';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { SwPush,   ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import { AuthguardadminService } from '../../globalComponent/authguard.admin.service';
import { authReducer } from '../hotel/hotelStore/auth.reducers';

describe('AdminModule', () => {
  let adminModule: AdminModule;

  beforeEach(() => {
    adminModule = new AdminModule();
  });

  fit('should create an instance', () => {
    expect(adminModule).toBeTruthy();
  });
});

describe('Router: AdminModule_CityStatics', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: Store<AuthState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(adminRoutes),
                SharedModule, AdminModule, StoreModule.forRoot( authReducer)],
      declarations: [ ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'},
                  AuthguardadminUpdateService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(CityStatisticComponent);
    store = fixture.debugElement.injector.get(Store);
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
  it('navigate to "cityStatistic" takes you to cityStatistic Page', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    let admin = false;
    router.navigate(['cityStatistic']);
    promise.then(() => {
              done = true;
              admin = true; });
    tick(50);
    expect(location.path()).toBe('/cityStatistic');
  }));
});


describe('Router: AdminModule_GenerateCoupon', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: Store<AuthState>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(adminRoutes), StoreModule.forRoot(authReducer),
                SharedModule, AdminModule, ToastrModule.forRoot(),  ServiceWorkerModule.register('', {enabled: false})],
      declarations: [ ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'},
    GlobalHTTPErrorHandler, ToastrService, SwPush, SwUpdate, AuthguardadminService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(GenerateCouponComponent);
    store = fixture.debugElement.injector.get(Store);
  });
  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));
  it('navigate to generatecoupon takes you to GenerateCoupon Page', fakeAsync(() => {
    router.navigate(['generateCoupon']);
    tick(50);
    expect(location.path()).toBe('/generateCoupon');
  }));
});

describe('Router: AdminModule_UpdateHotels', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: Store<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(adminRoutes),
                SharedModule, AdminModule,  StoreModule.forRoot(hotelViewReducers)],
      declarations: [ ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'},
                 GlobalHTTPErrorHandler],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(UpdateHotelsComponent);
    store = fixture.debugElement.injector.get(Store);
  });
  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));
  it('navigate to updateHotels takes you to UpdateHotels Page', fakeAsync(() => {
    router.navigate(['updateHotels']);
    tick(50);
    expect(location.path()).toBe('/updateHotels');
  }));
});


describe('Router: AdminModule_HotelList', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: Store<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(adminRoutes),
                SharedModule, AdminModule, StoreModule.forRoot(hotelStoreReducers)],
      declarations: [ ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'},
                  GlobalHTTPErrorHandler],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HotelListComponent);
    store = fixture.debugElement.injector.get(Store);
  });
  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => done = true);
    tick(50);
    expect(done).toBeTruthy();
  }));
  it('navigate to HotelList takes you to HotelList Page', fakeAsync(() => {
    router.navigate(['admin']);
    tick(50);
    expect(location.path()).toBe('/admin');
  }));
});




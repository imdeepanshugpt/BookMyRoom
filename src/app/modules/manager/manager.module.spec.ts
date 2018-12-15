import { ManagerModule } from './manager.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { GlobalHTTPErrorHandler } from '../../globalComponent/global-error-handler/global-http-error-handler';
import { SwPush,   ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerRoutingModule, managerRoutes } from './manager-routing.module';
import { APP_BASE_HREF } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { State } from '../hotel/hotelStore/hotelStore.State';
import * as viewHotelAction from '../hotel/hotelStore/hotelDetail.actions';
import { hotelViewReducers } from '../hotel/hotelStore/hotelDetail.reducers';

describe('ManagerModule', () => {
  let managerModule: ManagerModule;

  beforeEach(() => {
    managerModule = new ManagerModule();
  });

  fit('should create an instance', () => {
    expect(managerModule).toBeTruthy();
  });
});

describe('Router: ManagerDashboard', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let store: Store<State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(managerRoutes),
                SharedModule, ManagerModule, ToastrModule.forRoot(),
                ServiceWorkerModule.register('', {enabled: false}),
                StoreModule.forRoot(hotelViewReducers)],
      declarations: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [GlobalHTTPErrorHandler,  SwPush,
        SwUpdate, {provide: APP_BASE_HREF, useValue: '/'}]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(ManagerDashboardComponent);
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
  fit('navigate to "manager" takes you to ManagerDashboardComponent', fakeAsync(() => {
    router.navigate(['manager']);
    tick(50);
    expect(location.path()).toBe('/manager');
  }));
});

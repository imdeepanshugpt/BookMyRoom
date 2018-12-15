import { ChatService } from './globalComponent/chat.service';
import { ChatComponent } from './globalComponent/chat/chat.component';
import { StoreModule } from '@ngrx/store';
import { HttpService } from './globalComponent/http.service';
import { Store } from '@ngrx/store';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule, routes } from './app-routing.module';
import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AuthState } from './modules/hotel/hotelStore/hotelStore.State';
import * as AuthActions from './modules/hotel/hotelStore/auth.actions';
import * as fromAuth from './modules/hotel/hotelStore/auth.reducers';
import { authReducer } from './modules/hotel/hotelStore/auth.reducers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { JsonpModule, Jsonp, Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { GlobalHTTPErrorHandler } from './globalComponent/global-error-handler/global-http-error-handler';
import { SwPush,   ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import { ChatListComponent } from './globalComponent/chat-list/chat-list.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

describe('Router: App', () => {
    let location: Location;
    let router: Router;
    let fixture;
    let store: Store<AuthState>;
    beforeEach(async(() => {
      let service: HttpService;
      let httpMock: HttpTestingController;
      let toastService: ToastrService;
      let globalService: GlobalHTTPErrorHandler;
      let swPush: SwPush;
      TestBed.configureTestingModule({
        imports: [RouterTestingModule.withRoutes(routes), StoreModule.forRoot(authReducer), JsonpModule, HttpClientTestingModule,
          HttpClientModule, ToastrModule.forRoot(), ServiceWorkerModule.register('', {enabled: false}),
          ReactiveFormsModule, FormsModule],
        declarations: [
          HomeComponent,
          AppComponent,
          ChatComponent,
          ChatListComponent
        ],
        providers: [ HttpClientTestingModule,
          GlobalHTTPErrorHandler,
          HttpService,
          MockBackend,
          ToastrService,
          SwPush,
          SwUpdate,
          ChatService,
          {
            provide: Jsonp,
            deps: [MockBackend]
          }, ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });

      globalService = TestBed.get(GlobalHTTPErrorHandler);
      service = TestBed.get(HttpService);
      httpMock = TestBed.get(HttpTestingController);
      toastService = TestBed.get(ToastrService);
      swPush = TestBed.get(SwPush);
      router = TestBed.get(Router);
      location = TestBed.get(Location);
      fixture = TestBed.createComponent(AppComponent);
      store = fixture.debugElement.injector.get(Store);
    }));

    fit('fakeAsync works', fakeAsync(() => {
      const promise = new Promise((resolve) => {
        setTimeout(resolve, 10);
      });
      let done = false;
      promise.then(() => done = true);
      tick(50);
      expect(done).toBeTruthy();
    }));
    fit('navigate to "" redirects you to /home', fakeAsync(() => {
      router.navigate(['']);
      tick(50);
      expect(location.path()).toBe('/');
    }));
    fit('navigate to "home" takes you to /home', fakeAsync(() => {
      router.navigate(['/home']);
      tick(50);
      expect(location.path()).toBe('/home');
    }));

  });


describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  fit('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});

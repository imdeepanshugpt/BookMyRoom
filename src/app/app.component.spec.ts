import { ChatListComponent } from './globalComponent/chat-list/chat-list.component';
import { ChatService } from './globalComponent/chat.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { GlobalHTTPErrorHandler } from './globalComponent/global-error-handler/global-http-error-handler';
import { RouterTestingModule } from '@angular/router/testing';
import { LoaderComponent } from './globalComponent/loader/loader.component';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SharedModule } from './modules/shared/shared.module';
import { Store, StoreModule} from '@ngrx/store';
import { AuthState } from './modules/hotel/hotelStore/hotelStore.State';
import * as AuthActions from './modules/hotel/hotelStore/auth.actions';
import * as fromAuth from './modules/hotel/hotelStore/auth.reducers';
import { authReducer } from './modules/hotel/hotelStore/auth.reducers';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { SwPush,   ServiceWorkerModule, SwUpdate} from '@angular/service-worker';
import { firebaseConfig } from './app.module';
import { ChatComponent } from './globalComponent/chat/chat.component';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {Location} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    let toastService: ToastrService;
    let globalService: GlobalHTTPErrorHandler;
    let swPush: SwPush;
    let location: Location;
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, HeaderComponent, FooterComponent, LoaderComponent,  ChatComponent,
        ChatListComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot(authReducer),
        ToastrModule.forRoot(),
        ServiceWorkerModule.register('', {enabled: false}),
        AngularFireModule.initializeApp(firebaseConfig),
        ReactiveFormsModule, FormsModule
      ],
      providers: [
        GlobalHTTPErrorHandler,
        ToastrService,
        SwPush,
        SwUpdate,
        AngularFireAuth,
        ChatService
      ]
    }).compileComponents();
    globalService = TestBed.get(GlobalHTTPErrorHandler);
    toastService = TestBed.get(ToastrService);
    swPush = TestBed.get(SwPush);
    location = TestBed.get(Location);
  }));
  fit('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  fit(`should have as title 'Book-my-room'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Book-my-room');
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { SearchComponent } from './search.component';
import { LoaderComponent } from '../loader/loader.component';
import { GlobalHTTPErrorHandler } from '../global-error-handler/global-http-error-handler';
import { RouterTestingModule } from '@angular/router/testing';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { SwPush, ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { authReducer } from '../../modules/hotel/hotelStore/auth.reducers';
import { firebaseConfig } from '../../app.module';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { FooterComponent } from '../../core/footer/footer.component';
import { HeaderComponent } from '../../core/header/header.component';
import { DebugElement } from '../../../../node_modules/@angular/core';
import { By } from '@angular/platform-browser';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, FooterComponent, LoaderComponent, HeaderComponent
      ],
      imports: [
        RouterTestingModule,
        SharedModule,
        StoreModule.forRoot(authReducer),
        ToastrModule.forRoot(),
        ServiceWorkerModule.register('', { enabled: false })
      ],
      providers: [
        GlobalHTTPErrorHandler,
        ToastrService
      ]
    }).compileComponents();
  }));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('Search bar validity', () => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    const city = fixture.debugElement.query(By.css('.city'));
    const checkIn = fixture.debugElement.query(By.css('.checkin'));
    const checkOut = fixture.debugElement.query(By.css('.checkout'));
    const search = fixture.debugElement.query(By.css('.search-btn'));
    fixture.detectChanges();
  });
});

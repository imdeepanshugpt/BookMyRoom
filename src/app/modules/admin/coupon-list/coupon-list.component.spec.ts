import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { CouponListComponent } from './coupon-list.component';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../../globalComponent/http.service';
import { MatDialog } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { AuthState } from './../../hotel/hotelStore/hotelStore.State';
import { AuthActions } from './../../hotel/hotelStore/auth.actions';
import { authReducer } from '../../hotel/hotelStore/auth.reducers';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
describe('CouponListComponent', () => {
  let component: CouponListComponent;
  let fixture: ComponentFixture<CouponListComponent>;

  beforeEach(async(() => {
    let service: HttpService;
    let toastService: ToastrService;
    let globalService: GlobalHTTPErrorHandler;
   TestBed.configureTestingModule({
      declarations: [ CouponListComponent ],
      imports: [SharedModule, ToastrModule.forRoot(), HttpClientModule, HttpClientTestingModule],
      providers: [HttpService, GlobalHTTPErrorHandler,
                  ToastrService, StoreModule.forRoot(authReducer)]
    })
    .compileComponents();
    globalService = TestBed.get(GlobalHTTPErrorHandler);
    service = TestBed.get(HttpService);
    toastService = TestBed.get(ToastrService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

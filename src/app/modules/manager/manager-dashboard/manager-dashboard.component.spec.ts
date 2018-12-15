import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';

import { ManagerDashboardComponent } from './manager-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import { Store } from '@ngrx/store';
import { State, AuthState } from '../../hotel/hotelStore/hotelStore.State';
import * as HotelAction from '../../hotel/hotelStore/hotelStore.Actions';
import * as viewHotelAction from '../../hotel/hotelStore/hotelDetail.actions';
import * as actions from '../../hotel/hotelStore/auth.actions';
import { authReducer } from '../../hotel/hotelStore/auth.reducers';

describe('ManagerDashboardComponent', () => {
  let component: ManagerDashboardComponent;
  let fixture: ComponentFixture<ManagerDashboardComponent>;
  let store: Store<State>;
  // let store1: Store<AuthState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerDashboardComponent ],
      imports: [ NgxPaginationModule, SharedModule, ToastrModule.forRoot(),
                 RouterTestingModule, StoreModule.forRoot(authReducer)],
      providers: [GlobalHTTPErrorHandler, ToastrService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ManagerDashboardComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    // store1 = fixture.debugElement.injector.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should render 1 in page of manager dashboard', async(() => {
    const managerDashboard = fixture.debugElement.componentInstance;
    expect(managerDashboard.page).toEqual(1);
  }));

  fit('should render null in hotels of manager dashboard', async(() => {
    const managerDashboard = fixture.debugElement.componentInstance;
    expect(managerDashboard.hotels).toEqual([]);
  }));
});

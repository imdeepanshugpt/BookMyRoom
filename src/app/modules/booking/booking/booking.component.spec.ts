import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { hotelViewReducers } from './../../hotel/hotelStore/hotelDetail.reducers';
import { SharedModule } from '../../shared/shared.module';
import { State } from '../../hotel/hotelStore/hotelStore.State';
import { BookingState } from '../../hotel/hotelStore/hotelBooking.State';
import { Store, StoreModule } from '@ngrx/store';
import * as HotelsAction from './../../hotel/hotelStore/hotelStore.Actions';
import * as  HotelBookingAction from '../../hotel/hotelStore/hotelBooking.actions';
import { hotelBookingReducers } from './../../hotel/hotelStore/hotelBooking.reducers';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '../../../globalComponent/http.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs/Observable';
import * as  viewHotelAction from '../../hotel/hotelStore/hotelDetail.actions';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { JsonpModule, Jsonp, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import swal from 'sweetalert';
import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { hotelStoreReducers } from './../../hotel/hotelStore/hotelStore.reducers';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let store: Store<State>;
  let service: HttpService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [SharedModule, StoreModule.forRoot(hotelBookingReducers, hotelViewReducers),
        ReactiveFormsModule, JsonpModule, HttpClientTestingModule, ToastrModule.forRoot(),
        HttpClientModule, BrowserAnimationsModule, FormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        HttpService,
        MockBackend,
        GlobalHTTPErrorHandler,
        ToastrService,
        {
          provide: Jsonp,
          deps: [MockBackend]
        },
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(BookingComponent);
    store = fixture.debugElement.injector.get(Store);
    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
  });


  // fit('room field validity', () => {
  //   const room = component.booking.controls['rooms'];
  //   expect(room.valid).toBeTruthy();
  //   let errors = {};
  //   room.setValue('10');
  //   errors = room.errors || {};
  //   expect(errors['required']).toBeTruthy();
  //   expect(errors['min']).toBeTruthy();
  //   expect(errors['max']).toBeTruthy();
  //   room.setValue('50');
  //   errors = room.errors || {};
  //   expect(errors['required']).toBeTruthy(); // this works
  //   expect(errors['min']).toBeTruthy(); // this fails, "undefined"
  //   expect(errors['max']).toBeTruthy();
  // });


  // fit('guest field validity', () => {
  //   const guest = component.booking.controls['guests'];
  //   expect(guest.valid).toBeFalsy();
  //    let errors = {};
  //   guest.setValue('20');
  //   errors = guest.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['min']).toBeTruthy();
  //   expect(errors['max']).toBeTruthy();
  //   guest.setValue('70');
  //   errors = guest.errors || {};
  //   expect(errors['required']).toBeTruthy();
  //   expect(errors['min']).toBeTruthy();
  //   expect(errors['max']).toBeTruthy();

  // });

  // fit('it should create swal', () => {
  //   expect(component).toBeTruthy();
  // });
  // describe('swal', () => {
  //   it('should display the reference code', () => {
  //     expect(swal('9QE9OL99S')).toBeTruthy('9QE9OL99S');
  //   }
  //   );
  // });
});




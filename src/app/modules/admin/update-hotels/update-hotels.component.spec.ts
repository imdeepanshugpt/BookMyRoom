import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../../../globalComponent/http.service';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { UpdateHotelsComponent } from './update-hotels.component';
import { JsonpModule, Jsonp, Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store, StoreModule} from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { State } from '../../hotel/hotelStore/hotelStore.State';
import { Observable } from 'rxjs/Observable';
import * as viewHotelAction from '../../hotel/hotelStore/hotelDetail.actions';
import { hotelViewReducers } from '../../hotel/hotelStore/hotelDetail.reducers';
import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import { Router } from '@angular/router';


describe('UpdateHotelsComponent', () => {
  let component: UpdateHotelsComponent;
  let fixture: ComponentFixture<UpdateHotelsComponent>;
  let service: HttpService;
  let httpMock: HttpTestingController;
  let toastService: ToastrService;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, JsonpModule, HttpClientTestingModule,
        HttpClientModule, ToastrModule.forRoot(), RouterTestingModule,
        SharedModule, BrowserAnimationsModule, StoreModule.forRoot(hotelViewReducers)],
      declarations: [ UpdateHotelsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        HttpService,
        MockBackend,
        GlobalHTTPErrorHandler,
        ToastrService,
        {
          provide: Jsonp,
          deps: [MockBackend]
        },
        // {
        //   provide: NG_VALUE_ACCESSOR,
        //   multi: true,
        //   useExisting: forwardRef(() => UpdateHotelsComponent),
        // }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(UpdateHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = fixture.debugElement.injector.get(Store);
    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
    toastService = TestBed.get(ToastrService);

  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UpdateHotelsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   store = fixture.debugElement.injector.get(Store);
  // });

  // fit('should create', () => {
  //   expect(component).toBeTruthy();
  // });

// fit('hotelName field validity', () => {
//     let errors = {};
//     const hotelName = component.updateHotel.controls['hotelName'];
//     expect(hotelName.valid).toBeTruthy();

//     // Set name to something which doesn't obey pattern
//     hotelName.setValue('abc32');
//     errors = hotelName.errors || {};
//     expect(errors['pattern']).toBeTruthy();

//     // Set name to something correct which obeys pattern
//     hotelName.setValue('Pushpak Hotel');
//     errors = hotelName.errors || {};
//     expect(errors['pattern']).toBeFalsy();

//   });
});

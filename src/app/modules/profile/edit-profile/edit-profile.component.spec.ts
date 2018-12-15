
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { EditProfileComponent } from './edit-profile.component';
import { HttpService } from '../../../globalComponent/http.service';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { JsonpModule, Jsonp, Http} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import {Router} from '@angular/router';
import { profileRoutes } from '../profile-routing.module';
import { SwPush,   ServiceWorkerModule, SwUpdate} from '@angular/service-worker';



describe('EditProfileComponent', () => {
  let component: EditProfileComponent;
  let fixture: ComponentFixture<EditProfileComponent>;
  let router: Router;

  beforeEach(async(() => {
    let service: HttpService;
    let httpMock: HttpTestingController;
    let toastService: ToastrService;
    let globalService: GlobalHTTPErrorHandler;
    let swPush: SwPush;
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, JsonpModule, HttpClientTestingModule,
                HttpClientModule, ToastrModule.forRoot(),
                SharedModule, BrowserAnimationsModule,
              RouterTestingModule, ServiceWorkerModule.register('', {enabled: false})],
      declarations: [EditProfileComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        GlobalHTTPErrorHandler,
        HttpService,
        MockBackend,
        ToastrService,
        SwPush,
        SwUpdate,
        {
          provide: Jsonp,
          deps: [MockBackend]
        },
        {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => EditProfileComponent),
        }
      ]
    })
      .compileComponents();
      globalService = TestBed.get(GlobalHTTPErrorHandler);
    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
    toastService = TestBed.get(ToastrService);
    swPush = TestBed.get(SwPush);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // name field validity
  fit('name field validity', () => {
    let errors = {};
    const name = component.editProfile.controls['name'];
    expect(name.valid).toBeTruthy();

    // Set name to something which doesn't obey pattern
    name.setValue('abc32');
    errors = name.errors || {};
    expect(errors['pattern']).toBeTruthy();

    // Set name to something correct which obeys pattern
    name.setValue('snehita');
    errors = name.errors || {};
    expect(errors['pattern']).toBeFalsy();

  });

  // mobile field validity
  fit('mobile field validity', () => {
    let errors = {};
    const mobile = component.editProfile.controls['mobile'];
    expect(mobile.valid).toBeTruthy();


    // Set mobile to something which doesn't obey pattern
    mobile.setValue('12@%');
    errors = mobile.errors || {};
    expect(errors['pattern']).toBeTruthy();

    // Set mobile to something correct which obeys pattern
    mobile.setValue('9652695855');
    errors = mobile.errors || {};
    expect(errors['pattern']).toBeFalsy();

    mobile.setValue('9652695855');
    errors = mobile.errors || {};
    expect(errors['minlength']).toBeFalsy();

    mobile.setValue('965269585');
    errors = mobile.errors || {};
    expect(errors['minlength']).toBeTruthy();

    mobile.setValue('9652695854566');
    errors = mobile.errors || {};
    expect(errors['maxlength']).toBeTruthy();

  });
  // age field validity
  fit('age field validity', () => {
    let errors = {};
    const age = component.editProfile.controls['age'];
    expect(age.valid).toBeTruthy();


    age.setValue('12');
    errors = age.errors || {};
    expect(errors['min']).toBeTruthy();

    age.setValue('40');
    errors = age.errors || {};
    expect(errors['max']).toBeFalsy();

  });

});

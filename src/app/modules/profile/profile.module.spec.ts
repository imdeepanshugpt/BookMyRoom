import { ProfileModule } from './profile.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {Location} from '@angular/common';
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Router} from '@angular/router';
import { ProfileRoutingModule, profileRoutes } from './profile-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SharedModule } from '../shared/shared.module';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { GlobalHTTPErrorHandler } from '../../globalComponent/global-error-handler/global-http-error-handler';
import { SwPush,   ServiceWorkerModule, SwUpdate} from '@angular/service-worker';


describe('Router: EditProfile', () => {
  let location: Location;
  let router: Router;
  let fixture;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(profileRoutes),
                SharedModule, ProfileModule, ToastrModule.forRoot(),
                ServiceWorkerModule.register('', {enabled: false})],
      declarations: [ ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [GlobalHTTPErrorHandler,  SwPush,
        SwUpdate]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(EditProfileComponent);
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
  fit('navigate to "edit-profile" takes you to editProfilePage', fakeAsync(() => {
    router.navigate(['editProfile']);
    tick(50);
    expect(location.path()).toBe('/editProfile');
  }));
});


describe('ProfileModule', () => {
  let profileModule: ProfileModule;

  beforeEach(() => {
    profileModule = new ProfileModule();
  });

  fit('should create an instance', () => {
    expect(profileModule).toBeTruthy();
  });
});

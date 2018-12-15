import { auth_routes } from './../auth-routing/auth-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HttpService } from './../../../globalComponent/http.service';
import { SessionStorageService } from './../../../globalComponent/session-storage.service';
import { FirebaseService } from './../../../globalComponent/firebase.service';
import { LocalStorageService } from './../../../globalComponent/local-storage.service';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let localStorageService: LocalStorageService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(auth_routes)
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SignupComponent ],
      providers: [
        FirebaseService,
        SessionStorageService,
        Router,
        HttpService,
        MatSnackBar,
        LocalStorageService,
        Router
      ],
    })
    .compileComponents();
    router = TestBed.get(Router);
    localStorageService = TestBed.get(LocalStorageService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
  // fit('should use LocalStorageService', () => {
  //   localStorageService = TestBed.get(LocalStorageService);
  //   expect(localStorageService.getItem('name')).toBe('real value');
  // });
});

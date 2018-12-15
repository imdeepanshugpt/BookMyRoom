import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthState } from './../../hotel/hotelStore/hotelStore.State';
import { Store, StoreModule } from '@ngrx/store';
import { LocalStorageService } from './../../../globalComponent/local-storage.service';
import { HttpService } from './../../../globalComponent/http.service';
import { FirebaseService } from './../../../globalComponent/firebase.service';
import { Router } from '@angular/router';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '../../../../../node_modules/@angular/forms';
import * as AuthActions from './../../hotel/hotelStore/auth.actions';
import * as fromAuth from '../../hotel/hotelStore/auth.reducers';
import { LoginComponent } from './login.component';
import { authReducer } from '../../hotel/hotelStore/auth.reducers';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // const spy: any;
  let localStorageService: LocalStorageService;
  let firebaseService: FirebaseService;
  let router: Router;
  let snackbar: MatSnackBar;
  let authStore: Store<AuthState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ authReducer })
      ],
      declarations: [LoginComponent],
      providers: [
        HttpService,
        FirebaseService,
        Router,
        MatSnackBar,
        LocalStorageService,
        Store
      ]
    })
      .compileComponents();
  }));

  // private authService: AuthService,
  // private firebaseService: FirebaseService,
  // private router: Router,
  // public snackBar: MatSnackBar,
  // public localStorageService: LocalStorageService,
  // public authStore: Store<AuthState>

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorageService = TestBed.get(LocalStorageService);
    firebaseService = TestBed.get(FirebaseService);
    router = TestBed.get(Router);
    snackbar = TestBed.get(MatSnackBar);
    authStore = TestBed.get(Store);
  });

  // it('should use LocalStorageService', () => {
  //   authStore.dispatch({
  //     type: AuthActions.SIGNIN, payload: {
  //       name: localStorageService.getItem('name'),
  //       email: localStorageService.getItem('email'),
  //     });
  //     expect(localStorageService.getItem('name')).toBeTruthy();
  // });
});

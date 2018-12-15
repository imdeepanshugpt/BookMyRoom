import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { LoginModalComponent } from './login/modals/login-modal/login-modal.component';
import { RegisterComponent } from './signup/register/register.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule
  ],
  entryComponents: [
    LoginModalComponent
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    LoginModalComponent,
    RegisterComponent
  ],
  exports: [
    LoginModalComponent
  ]
})

export class AuthModule { }

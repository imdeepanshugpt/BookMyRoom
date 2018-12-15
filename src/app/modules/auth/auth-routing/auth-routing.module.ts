import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from '../signup/register/register.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';

export const auth_routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(auth_routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AuthRoutingModule { }

import { ChatComponent } from './globalComponent/chat/chat.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { HomeComponent } from './home/home.component';
import { OfflineComponent } from './globalComponent/offline/offline.component';
export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'offline',
    component: OfflineComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule,
    AuthModule,
    HotelModule
  ],
  declarations: []
})
export class AppRoutingModule { }

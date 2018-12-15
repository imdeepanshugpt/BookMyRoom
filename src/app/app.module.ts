import { ChatService } from './globalComponent/chat.service';
import { SwUpdate } from '@angular/service-worker';
import { HttpService } from './globalComponent/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { state } from '@angular/animations';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AuthDeactivateHotel } from './globalComponent/deactivateHotelEdit.service';
import { AuthguardService } from './globalComponent/authguard.service';
import { AuthguardviewService } from './globalComponent/authguard.view.service';
import { AuthguardadminService } from './globalComponent/authguard.admin.service';
import { AuthguardadminUpdateService } from './globalComponent/authguard.adminUpdate.service';
import { AuthDeactivate } from './globalComponent/deactivate.service';

import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './modules/admin/admin.module';
import { BookingModule } from './modules/booking/booking.module';
import { ManagerModule } from './modules/manager/manager.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { CarouselComponent } from './core/carousel/carousel.component';
import { SearchComponent } from './globalComponent/search/search.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { GlobalHTTPErrorHandler } from './globalComponent/global-error-handler/global-http-error-handler';
import { LoaderComponent } from './globalComponent/loader/loader.component';
import { ChatComponent } from './globalComponent/chat/chat.component';
import { OfflineComponent } from './globalComponent/offline/offline.component';


export const firebaseConfig = {
  apiKey: 'AIzaSyCuIUDev8zB6-3rZ14rJYVzK7hnCgmNtns',
  authDomain: 'bookmyroom-1535445796818.firebaseapp.com',
  databaseURL: 'https://bookmyroom-1535445796818.firebaseio.com',
  projectId: 'bookmyroom-1535445796818',
  storageBucket: 'bookmyroom-1535445796818.appspot.com',
  messagingSenderId: '156377738605'
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CarouselComponent,
    LoaderComponent,
    ChatComponent,
    OfflineComponent
  ],
  imports: [
    NgxPaginationModule,
    BrowserModule,
    AngularFontAwesomeModule,
    AuthModule,
    HotelModule,
    ProfileModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    BookingModule,
    AdminModule,
    ManagerModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  exports: [
    AdminModule
  ],
  providers: [
    AngularFireAuth,
    AuthguardService,
    AuthguardviewService,
    AuthguardadminService,
    AuthguardadminUpdateService,
    AuthDeactivate,
    AuthDeactivateHotel,
    HttpService,
    GlobalHTTPErrorHandler,
    SwUpdate,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

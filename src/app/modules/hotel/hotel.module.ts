import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { state } from '@angular/animations';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { HotelRoutingModule } from './hotel-routing.module';

import { HotelCompareComponent } from './hotel-compare/hotel-compare.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { hotelStoreReducers } from './hotelStore/hotelStore.reducers';
import { hotelCompareReducers } from './hotelStore/hotelCompare.reducers';
import { hotelViewReducers} from './hotelStore/hotelDetail.reducers';
import { authReducer } from './hotelStore/auth.reducers';
import { hotelBookingReducers } from './hotelStore/hotelBooking.reducers';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HotelListComponent,
    HotelCompareComponent,
    HotelDetailComponent,
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    SharedModule,
    HotelRoutingModule,
    StoreModule.forRoot({
      hotelListRed: hotelStoreReducers,
      hotelCompareRed: hotelCompareReducers,
      hotelViewRed: hotelViewReducers,
      hotelBookingRed: hotelBookingReducers,
      auth: authReducer
    }),
    BrowserModule,
    BrowserAnimationsModule,
    // RouterModule.forChild(routes)
  ],
  exports: [
    HotelListComponent,
    HotelCompareComponent,
    HotelDetailComponent,
  ]
})
export class HotelModule { }

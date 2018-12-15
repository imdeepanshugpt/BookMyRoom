import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { BookingComponent } from './booking/booking.component';
import {BookingRoutingModule} from './booking-routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BookingRoutingModule
  ],
  exports: [],
  declarations: [BookingComponent]
})
export class BookingModule {}

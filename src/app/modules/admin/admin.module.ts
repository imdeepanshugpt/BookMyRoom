import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { GenerateCouponComponent } from './generate-coupon/generate-coupon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateHotelsComponent } from './update-hotels/update-hotels.component';
import { CityStatisticComponent } from './city-statistic/city-statistic.component';
import { CouponListComponent } from './coupon-list/coupon-list.component';
import { AuthDeactivateHotel } from '../../globalComponent/deactivateHotelEdit.service';
import { ApproveRequestComponent } from './approve-request/approve-request.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxPaginationModule
  ],
  entryComponents: [
    AddHotelsComponent
  ],
  declarations: [
    AddHotelsComponent,
    HotelListComponent,
    GenerateCouponComponent,
    DashboardComponent,
    UpdateHotelsComponent,
    CityStatisticComponent,
    CouponListComponent,
    ApproveRequestComponent
  ],
  exports: [
    HotelListComponent,
    DashboardComponent,
    AddHotelsComponent,
    GenerateCouponComponent,
    UpdateHotelsComponent,
    CouponListComponent,
    AddHotelsComponent
  ],
  providers: [AuthDeactivateHotel]
})
export class AdminModule { }

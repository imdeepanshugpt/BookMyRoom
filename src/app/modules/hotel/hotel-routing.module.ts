import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { HotelCompareComponent } from './hotel-compare/hotel-compare.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { BookingComponent } from '../booking/booking/booking.component';
import { AuthguardviewService } from '../../globalComponent/authguard.view.service';
import { AuthguardService } from '../../globalComponent/authguard.service';


export const hotelRoutes: Routes = [
    {path: 'hotel',  component: HotelListComponent},
    {path: 'compare', component: HotelCompareComponent},
    {path: 'detail', component: HotelDetailComponent},
    {path: 'booking', canActivate: [AuthguardService], component: BookingComponent},
    {path: 'detail', canActivate: [AuthguardviewService], component: HotelDetailComponent}
];
@NgModule({
    imports: [
        RouterModule.forChild(hotelRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HotelRoutingModule {
}




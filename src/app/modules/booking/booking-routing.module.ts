import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthguardService } from '../../globalComponent/authguard.service';
import { BookingComponent } from './booking/booking.component';
export const bookingRoutes: Routes = [
    {
        path: 'booking',
        canActivate: [AuthguardService],
        component: BookingComponent
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(bookingRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class BookingRoutingModule {
}





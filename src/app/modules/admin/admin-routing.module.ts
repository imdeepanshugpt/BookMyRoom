import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { GenerateCouponComponent } from './generate-coupon/generate-coupon.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CityStatisticComponent } from './city-statistic/city-statistic.component';
import { UpdateHotelsComponent } from './update-hotels/update-hotels.component';
import { AuthguardadminService } from '../../globalComponent/authguard.admin.service';
import { AuthguardadminUpdateService } from '../../globalComponent/authguard.adminUpdate.service';
import { AuthDeactivateHotel } from '../../globalComponent/deactivateHotelEdit.service';
export const adminRoutes: Routes = [
    { path: 'admin', canActivate: [AuthguardadminService], component: HotelListComponent },
    { path: 'generateCoupon', canActivate: [AuthguardadminService], component: GenerateCouponComponent },
    { path: 'updateHotels', canActivate: [AuthguardadminUpdateService], component: UpdateHotelsComponent,
                            canDeactivate: [AuthDeactivateHotel] },
    { path: 'cityStatistic', canActivate: [AuthguardadminUpdateService], component: CityStatisticComponent }
];
@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {
}

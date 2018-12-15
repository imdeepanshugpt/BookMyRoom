
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateHotelsComponent } from './update-hotels/update-hotels.component';
export const managerRoutes: Routes = [
    { path: 'manager',  component: ManagerDashboardComponent },
    { path: 'update',  component: UpdateHotelsComponent }

];
@NgModule({
    imports: [
        RouterModule.forChild(managerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ManagerRoutingModule {
}

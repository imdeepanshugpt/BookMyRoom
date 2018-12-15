import { AdminModule } from '../admin/admin.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AddHotelsComponent } from '../admin/add-hotels/add-hotels.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateHotelsComponent } from './update-hotels/update-hotels.component';

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedModule,
    AdminModule,
    MatDialogModule,
    NgxPaginationModule
  ],
  declarations: [ManagerDashboardComponent, UpdateHotelsComponent],
  exports: [ManagerDashboardComponent],
  entryComponents: [
    AddHotelsComponent
  ],
})
export class ManagerModule { }

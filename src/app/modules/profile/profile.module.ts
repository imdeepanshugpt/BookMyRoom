import { SwUpdate } from '@angular/service-worker';
import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { AuthDeactivate } from '../../globalComponent/deactivate.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [EditProfileComponent, BookingHistoryComponent],
  exports: [EditProfileComponent],
  providers: [AuthDeactivate, SwUpdate]
})
export class ProfileModule { }

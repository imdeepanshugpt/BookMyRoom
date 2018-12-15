import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthDeactivate } from '../../globalComponent/deactivate.service';

export const profileRoutes: Routes = [
    {
        path: 'editProfile',
        component: EditProfileComponent,
        canDeactivate: [AuthDeactivate]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(profileRoutes)
    ],
    exports: [
        RouterModule,
    ]
})
export class ProfileRoutingModule {
}


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Rx';
import { Store } from '@ngrx/store';
import { EditProfileComponent } from '../modules/profile/edit-profile/edit-profile.component';

@Injectable({
    providedIn: 'root'
})
export class AuthDeactivate implements CanDeactivate<EditProfileComponent> {

    canDeactivate(
        component: EditProfileComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): boolean {
        return component.canDeactivate() || confirm('Are you sure to leave the page?');
      }
}




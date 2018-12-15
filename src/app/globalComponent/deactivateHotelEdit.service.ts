
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Rx';
import { Store } from '@ngrx/store';
import { UpdateHotelsComponent } from '../modules/admin/update-hotels/update-hotels.component';

@Injectable({
    providedIn: 'root'
})
export class AuthDeactivateHotel implements CanDeactivate<UpdateHotelsComponent> {

    canDeactivate(
        component: UpdateHotelsComponent,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ): boolean {
        return component.canDeactivate() || confirm('Are you sure to leave the page?');
      }
}




import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AuthState } from '../modules/hotel/hotelStore/hotelStore.State';
import { LoginModalComponent } from '../modules/auth/login/modals/login-modal/login-modal.component';
import { FirebaseService } from './firebase.service';
@Injectable()
export class AuthguardService implements CanActivate {
    constructor(private store: Store<AuthState>, private router: Router, public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private tstr: ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth').map((authState: AuthState) => {
            if (authState.booked) {
                if (authState.authenticated) {
                    return authState.authenticated;
                } else {
                    const dialogRef = this.dialog.open(LoginModalComponent, {
                        width: '500px',
                        height: '600px'
                    });
                    this.firebaseService.setDialogRef(dialogRef);
                    dialogRef.afterClosed().subscribe(result => {
                        this.store.select('auth').subscribe(resState => {
                            if (resState.authenticated) {
                                this.router.navigate(['/booking']);
                            } else {
                                this.router.navigate(['/hotel']);
                            }
                        });
                    });

                }
                this.router.navigate(['/hotel']);
            }

        });
    }
}

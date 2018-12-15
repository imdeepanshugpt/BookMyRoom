import { ChatService } from './../../globalComponent/chat.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '../../modules/hotel/hotelStore/hotelStore.State';
import * as AuthActions from '../../modules/hotel/hotelStore/auth.actions';
import * as fromAuth from '../../modules/hotel/hotelStore/auth.reducers';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '../../modules/auth/login/modals/login-modal/login-modal.component';
import { LocalStorageService } from '../../globalComponent/local-storage.service';
import { FirebaseService } from '../../globalComponent/firebase.service';
import { SessionStorageService } from '../../globalComponent/session-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public isAuthenticated: Observable<AuthState>;
  public name: string;
  constructor(
    private dialog: MatDialog,
    private firebaseService: FirebaseService,
    private authStore: Store<AuthState>,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private chatService: ChatService) { }
  openManagerDialog() {
    this.sessionStorageService.setItem('Manager', true);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginModalComponent, {
      width: '500px',
      height: '600px'
    });

    this.firebaseService.setDialogRef(dialogRef);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  signOut() {
    this.firebaseService.googleLogout();
    this.authStore.dispatch(new AuthActions.Logout());
    this.localStorageService.removeItem('admin');
    this.router.navigate(['home']);
    this.localStorageService.removeItem('Manager');
    this.localStorageService.removeItem('subAdmin');
    this.localStorageService.removeItem('name');
    this.sessionStorageService.setItem('Manager', false);
  }
  ngOnInit() {
    this.isAuthenticated = this.authStore.select('auth');
    this.isAuthenticated.subscribe(
      state => {
        this.name = state.name;
        console.log(this.name);
      }
    );

  }
}

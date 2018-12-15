import { LocalStorageService } from '../../../globalComponent/local-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../globalComponent/http.service';
import { MatDialog } from '@angular/material/dialog';
import { AddHotelsComponent } from '../../admin/add-hotels/add-hotels.component';
import { Store } from '@ngrx/store';
import { State, AuthState } from '../../hotel/hotelStore/hotelStore.State';
import * as HotelAction from '../../hotel/hotelStore/hotelStore.Actions';
import * as viewHotelAction from '../../hotel/hotelStore/hotelDetail.actions';
import * as actions from '../../hotel/hotelStore/auth.actions';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent implements OnInit {
  public hotels = [];
  hoteles: Observable<{states: State[]}>;
  public page = 1;

  constructor(private httpService: HttpService,
           private store: Store<{ hotelListRed: { states: State[] } }>,
              private adminStore: Store< {auth: {states: AuthState}} >,
              private router: Router,
              private dialog: MatDialog,
              private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.httpService.post('manager/getManagerHotels', { managerEmail: this.localStorageService.getItem('subAdmin') })
    .subscribe((response) => {
      this.hotels = response;
    });
  }

  onEdit(hotel) {
    this.adminStore.dispatch(new actions.AdminUpdate());
    this.store.dispatch(new viewHotelAction.ViewHotels(hotel));
    this.router.navigate(['/update']);
  }

  onAdd() {
    // this.localStorageService.setItem('subAdmin', 'manager2@gmail.com');
    const openComp = this.dialog.open(AddHotelsComponent, {});
  }
}

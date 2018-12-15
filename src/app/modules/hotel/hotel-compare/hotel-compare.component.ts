import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { SessionStorageService } from '../../../globalComponent/session-storage.service';
import { HttpService } from '../../../globalComponent/http.service';
import { State, AuthState } from '../hotelStore/hotelStore.State';
import * as HotelsAction from '../hotelStore/hotelStore.Actions';
import * as HotelCompareActions from '../hotelStore/hotelCompare.action';
import * as HotelDetailActions from '../hotelStore/hotelDetail.actions';
import * as AuthAction from '../hotelStore/auth.actions';
import { compareHotels } from '../hotelStore/hotelCompare.action';


@Component({
  selector: 'app-hotel-compare',
  templateUrl: './hotel-compare.component.html',
  styleUrls: ['./hotel-compare.component.scss']
})
export class HotelCompareComponent implements OnInit {
  public hotelNumber: number;
  public hotels: Observable<{ states: State[] }>;
  public compareHotels = [];
  constructor(private compareStore: Store<{ hotelCompareRed: { states: State[] } }>,
    private authStore: Store<{ auth: { states: AuthState } }>,
    private router: Router,
    private viewStore: Store<{ hotelViewRed: { states: State[] } }>,
    private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.compareHotels = JSON.parse(this.sessionStorageService.getItem('hotelCompare'));
    this.hotelNumber = this.compareHotels.length;
  }

  BookNow(hotel) {
    this.viewStore.dispatch(new HotelDetailActions.ViewHotels(hotel));
    this.authStore.dispatch(new AuthAction.Booked());
    this.router.navigate(['/booking']);
  }

}

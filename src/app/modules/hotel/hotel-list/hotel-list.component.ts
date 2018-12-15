import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

import { State, AuthState } from '../hotelStore/hotelStore.State';
import * as HotelsAction from '../hotelStore/hotelStore.Actions';
import * as HotelCompareActions from '../hotelStore/hotelCompare.action';
import * as HotelDetailActions from '../hotelStore/hotelDetail.actions';
import * as HotelBookingActions from '../hotelStore/hotelBooking.actions';
import * as AuthAction from '../hotelStore/auth.actions';
import { HotelRoutingModule } from '../hotel-routing.module';
import { HttpService } from '../../../globalComponent/http.service';
import { SessionStorageService } from '../../../globalComponent/session-storage.service';
import { LocalStorageService } from '../../../globalComponent/local-storage.service';


@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  public message: string;
  public checkedhotels = [];
  public hotelsChecked: number;
  public hotels: Observable<{ states: State[] }>;
  public checked = false;
  public enabled: boolean;
  public limit: number;
  public lowPrice: false;
  public highPrice: false;
  public rating: false;
  public noOfResult = 0;
  public page = 1;

  constructor(
    private localStorageService: LocalStorageService,
    private httpService: HttpService,
    private store: Store<{ hotelListRed: { states: State[] } }>,
    private comparestore: Store<{ hotelCompareRed: { states: State[] } }>,
    private detailstore: Store<{ hotelViewRed: { states: State[] } }>,
    private bookstore: Store<{ hotelBookingRed: { states: State[] } }>,
    private authStore: Store<{ auth: { states: AuthState } }>,
    private router: Router,
    private vcr: ViewContainerRef,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService
  ) { }
  AC = false;
  WIFI = false;
  FOOD = false;
  Rating = false;

  ngOnInit() {
    this.enabled = true;
    const payload = {
      checkin: 'checkin',
      checkout: 'checkout',
      city: this.sessionStorageService.getItem('searchCity'),
      guest: 'guest',
      room: 'room'
    };
    if (this.sessionStorageService.getItem('searchCity') !== null) {
      this.httpService.post('hotel', payload)
        .subscribe(
          (response: { doc: [{}] }) => {
            this.store.dispatch(new HotelsAction.AddHotels(response.doc));
          },
          (error) => console.log(error)
        );
    }
    this.hotels = this.store.select('hotelListRed');
  }

  onCompare() {
    this.comparestore.dispatch(new HotelCompareActions.CompareHotels(this.checkedhotels));
    this.sessionStorageService.setItem('hotelCompare', JSON.stringify(this.checkedhotels));
    this.router.navigate(['compare']);
  }
  sortBy(param: number) {
    if (param === 1) {
      this.store.dispatch(new HotelsAction.SortHotelsByLessPrice());
    } else if (param === 2) {
      this.store.dispatch(new HotelsAction.SortHotelsByMorePrice());
    } else {
      this.store.dispatch(new HotelsAction.SortHotelsByRating());
    }
  }
  byRating() {
    this.store.dispatch(new HotelsAction.SortHotelsByRating());
  }
  onView(getHotel) {
    this.authStore.dispatch(new AuthAction.Viewed());
    this.detailstore.dispatch(new HotelDetailActions.ViewHotels(getHotel));
    this.router.navigate(['/detail']);

  }
  onBook(getHotel) {
    this.authStore.dispatch(new AuthAction.Booked());
    this.detailstore.dispatch(new HotelDetailActions.ViewHotels(getHotel));
    this.router.navigate(['/booking']);
  }
  comparSelected(selectedHotel) {
    let ishotelAvaliable = 0;
    let removed = 0;
    for (let i = 0; i < this.checkedhotels.length; i++) {
      if (selectedHotel.hotelName !== this.checkedhotels[i].hotelName) {
        ishotelAvaliable++;
      } else {
        this.checkedhotels.splice(ishotelAvaliable, 1);
        removed = 1;
        break;
      }
    }
    if (ishotelAvaliable === this.checkedhotels.length && removed !== 1) {
      if (this.checkedhotels.length <= 4) {
        this.checkedhotels.push(selectedHotel);
      }
    }
    if ((this.checkedhotels.length > 1) && (this.checkedhotels.length < 5)) {
      this.enabled = false;
    } else {
      this.enabled = true;
      if (this.checkedhotels.length === 5) {
        this.toastr.warning('Limit of comparison is 4. Remove one hotel and try to compare');
      }
    }
  }

  onAcClick() {
    const amenities = {
      ac: this.AC,
      wifi: this.WIFI,
      food: this.FOOD
    };
    this.store.dispatch(new HotelsAction.SortAmenities(amenities));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { State } from '../../modules/hotel/hotelStore/hotelStore.State';
import { BookingState } from '../../modules/hotel/hotelStore/hotelBooking.State';
import * as HotelsAction from '../../modules/hotel/hotelStore/hotelStore.Actions';
import * as  HotelBookingAction from '../../modules/hotel/hotelStore/hotelBooking.actions';
import { HotelBookingActions, BookHotels } from '../../modules/hotel/hotelStore/hotelBooking.actions';
import { HttpService } from '../http.service';
import { LocalStorageService } from '../local-storage.service';
import { SessionStorageService } from '../session-storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public errorMessage: string;
  public minDate = new Date();
  public myControl = new FormControl();
  public options;
  public filteredOptions: Observable<string[]>;
  constructor(private httpService: HttpService,
    private router: Router,
    public snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private store: Store<{ hotelListRed: { states: State[] } }>,
    private bookingstore: Store<{ hotelBookingRed: { states: BookingState[] } }>) { }
  ngOnInit() {
    this.httpService.get('userSearch')
      .subscribe(
      (res) => {
        this.options = res;
        const index = this.options.indexOf(null);
        if (index > -1) {
          this.options.splice(index, 1);
        }
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            this.errorMessage = '';
            const filterValue = value.toLowerCase();
            if ((this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)).length === 0) {
              this.errorMessage = 'No match found!';
            }
            return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
          })
        );
      }
      );
  }
  searchHotel(checkin: Date, checkout: Date, city: string) {
    const x = new Date(checkin);
    const y = new Date(checkout);
    if (!(x <= y)) {
      this.snackBar.open('Are you sure those are the right dates?', null, {
        duration: 2000,
      });
    }


    if ((x <= y) ) {
      const payload = {
        checkin: checkin,
        checkout: checkout,
        city: city
      };
      const bookingPayload = [{
        checkin: checkin,
        checkout: checkout,
        city: city
      }];
      this.localStorageService.setItem('searchCity', city);
      this.httpService.post('hotel', payload)
        .subscribe(
          (response: { doc: [{}] }) => {
            this.store.dispatch(new HotelsAction.AddHotels(response.doc));
            this.bookingstore.dispatch(new HotelBookingAction.BookHotels(bookingPayload));
            this.router.navigate(['/hotel']);
          },
          (error) => console.log(error)
        );
    }
  }
}

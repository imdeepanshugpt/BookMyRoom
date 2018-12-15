import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { HttpService } from '../../../globalComponent/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State } from '../../hotel/hotelStore/hotelStore.State';
import { BookingState } from '../../hotel/hotelStore/hotelBooking.State';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as HotelsAction from '../../hotel/hotelStore/hotelStore.Actions';
import * as  HotelBookingAction from '../../hotel/hotelStore/hotelBooking.actions';
import { LocalStorageService } from '../../../globalComponent/local-storage.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})

export class BookingComponent implements OnInit {
  public hotels: Observable<{ states: State[] }>;
  public hotelBooking: Observable<{ states: BookingState[] }>;
  public guests: number;
  public totalAmount: Number;
  public refferalcode: string;
  public booking: FormGroup;
  public hPrice: number;
  public hReg: number;
  public sum: number;
  public ref: string;
  public checkin: Date;
  public checkout: Date;
  public diff: Number;
  public noOfDays: Number;
  public add: Number;
  public email = this.localStorageService.getItem('email');
  public disable = false;
  public discounts;
  public resultArray;
  public selectedCoupon: string;
  public image;
  public couponDiscount: number;
  public couponCodes: Array<string>;
  public disc;
  public checkIn: Date;
  public checkOut: Date;
  public hotelName: String;
  public hName: String;
  constructor(private router: Router,
    private httpService: HttpService,
    private searchstore: Store<{ hotelBookingRed: { states: State[] } }>,
    private hotelstore: Store<{ hotelViewRed: { states: State[] } }>,
    public localStorageService: LocalStorageService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.booking = new FormGroup({
      'guests': new FormControl(1, [Validators.min(1), Validators.max(60), Validators.required]),
      'rooms': new FormControl(1, [Validators.min(1), Validators.max(20), Validators.required])
    });
    this.disc = 0;
    this.hotelBooking = this.hotelstore.select('hotelBookingRed');
    this.hotels = this.searchstore.select('hotelViewRed');
    this.hotels.subscribe(response => {
      this.hPrice = response['hotels'][0]['hotelPrice'];
      this.hReg = response['hotels'][0]['hotelRegistrationNumber'];
      this.image = response['hotels'][0]['imageUrls']['img1'];
      this.hName = response['hotels'][0]['hotelName'];
      console.log(this.image);
    });
    this.hotelBooking.subscribe(response => {
      this.checkin = response['hotelBooking'][0]['checkin'];
      this.checkout = response['hotelBooking'][0]['checkout'];
    });
    this.couponDiscount = 0;
    this.httpService.get('discount')
    .subscribe((response) => {
      this.discounts = response;
      this.couponCodes = this.discounts.map(x => x.referralCode);
    });

    this.diff = Math.abs(new Date(this.checkin).getTime() - new Date(this.checkout).getTime());
    this.noOfDays = Math.ceil(Number(this.diff) / (1000 * 3600 * 24));
    if (Number(this.noOfDays) === 0) {
      this.noOfDays = 1;
    }
    this.sum = this.hPrice * Number(this.noOfDays);
  }

  recalculateAmount() {
    console.log(this.selectedCoupon);
    let disc;
    let index;
    if (!this.selectedCoupon || this.selectedCoupon === 'none') {
       disc = 0;
       this.disc = disc;
    } else {
       index = this.couponCodes.indexOf(this.selectedCoupon);
       disc = this.discounts[index].discount;
       this.disc = disc;
    }
    console.log(this.noOfDays);
    this.sum = ((Number(this.booking.value.rooms) * this.hPrice) * Number(this.noOfDays)) - disc;
  }
  onSubmit() {
    if ((Number(this.booking.value.rooms) * 3) < Number(this.booking.value.guests)) {
      this.snackBar.open('Sorry! You can have at most three guests per room.', null, {
        duration: 2000,
      });
    } else if (Number(this.booking.value.rooms) > Number(this.booking.value.guests)) {
      this.snackBar.open('Each room should have a guest.', null, {
        duration: 2000,
      });
    } else {
      const value = Math.random().toString(36).substr(2, 9);
      this.ref = value.toUpperCase();
      swal(`Booking Reference ID: ${this.ref}`,
      'Your booking is confirmed. The Booking Reference ID has also been sent to your mail.', 'success');
      this.router.navigate(['/home']);
      const payload = {
        customerEmail: this.email,
        bookingReferenceID: this.ref,
        hotelName: this.hName,
        hotelRegistrationNumber: this.hReg,
        checkIn: this.checkin,
        checkOut: this.checkout,
        bookedRooms: this.booking.value.rooms,
        bookedGuests: Number(this.booking.value.guests),
        totalAmount: Number(this.sum),
      };
      this.httpService.post('booking/bookingdetails', payload)
        .subscribe(
        (response) => {
          console.log(response);
          console.log('message');
        });
    }
  }
}

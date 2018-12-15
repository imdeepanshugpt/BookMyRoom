import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../../../globalComponent/http.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.scss']
})
export class BookingHistoryComponent implements OnInit {

  constructor(private httpService: HttpService,
    private viewContainerRef: ViewContainerRef,
    private toastr: ToastrService) { }
  public history;
  public errorMessage = '';

  ngOnInit() {
    this.httpService.post('booking/bookinghistory', { customerEmail: localStorage.getItem('email') })
      .subscribe((response) => {
        this.history = response;
        for (let i = 0; i < Object.keys(response).length; i++) {
          const checkInDate = new Date(response[i]['checkIn']);
          response[i]['checkIn'] = checkInDate.toUTCString();
          const checkOutDate = new Date(response[i]['checkOut']);
          response[i]['checkOut'] = checkOutDate.toUTCString();
        }

        if (Object.keys(response).length === 0) {
          this.errorMessage = 'You have not made any bookings yet';
        }
      });
  }

}

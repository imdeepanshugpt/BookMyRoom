import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../../globalComponent/http.service';
import { MatDialog } from '@angular/material/dialog';

import { GenerateCouponComponent } from './../generate-coupon/generate-coupon.component';
import { AuthState } from './../../hotel/hotelStore/hotelStore.State';
import { AuthActions } from './../../hotel/hotelStore/auth.actions';

@Component({
  selector: 'app-coupon-list',
  templateUrl: './coupon-list.component.html',
  styleUrls: ['./coupon-list.component.scss']
})
export class CouponListComponent implements OnInit {
  @Input() showAdminButtons: boolean;

  public couponList;
  public isAdmin;
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authStore: Store<AuthState>
  ) { }

  ngOnInit() {
    this.authStore.select('auth').subscribe(
      state => {
        if (state.name === 'ADMIN') {
          this.isAdmin = true && this.showAdminButtons;
        } else {
          this.isAdmin = false;
        }
      }
    );
    this.httpService.get('discount')
      .subscribe(
        (response) => {
          this.couponList = response;
        },
        (error) => console.log(error)
      );
  }

  addCoupon(): void {
    const dialogRef = this.dialog.open(GenerateCouponComponent, {
      width: '300px',
      height: '300px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteCoupon(couponCode: string) {
    const status = confirm('Are you sure you want to delete this coupon?');
    if (status === true) {
      this.httpService.delete('discount', couponCode)
        .subscribe(
          (res) => {
            console.log(res);
            this.snackBar.open('Coupon deleted successfully.', null, {
              duration: 2000,
            });
            this.httpService.get('discount')
              .subscribe(
                (response) => {
                  this.couponList = response;
                  console.log(this.couponList);
                },
                (error) => console.log(error)
              );
          },
          (error) => console.log(error)
        );
    }

  }
}

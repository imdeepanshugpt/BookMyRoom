import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from '../../../globalComponent/http.service';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-generate-coupon',
  templateUrl: './generate-coupon.component.html',
  styleUrls: ['./generate-coupon.component.scss']
})
export class GenerateCouponComponent implements OnInit {
  public coupon = '';
  public couponForm: FormGroup;
  readonly VAPID_PUBLIC_KEY = 'BLhKMSmKqPS_nrTkR02A-LgdYCLd2YTVDwHYdeDBDAQOyi7SfxKnM4BcVp5cuVWx48zqrmGAfL6VJwo9QsHKUNY';
  constructor(private httpService: HttpService,
    private snackBar: MatSnackBar,
    private swPush: SwPush
  ) { }

  ngOnInit() {
    this.couponForm = new FormGroup({
      'couponCode': new FormControl(null, [Validators.pattern('[0-9A-Z]{6}')]),
      'amount': new FormControl(null, [Validators.min(50), Validators.max(1000), Validators.required])
    });
  }

  addcoupon(referralcode: string, amount: string) {
    const payload = {
      referralCode: referralcode,
      discount: amount
    };
    this.httpService.post('admin/generatecoupon', payload)
      .subscribe(
        (response) => {
          this.snackBar.open('Coupon generated successfully.', null, {
            duration: 2000,
          });
          this.httpService.post('subscribe/notifySubscriber', {value: 'New Offer Available!'}).subscribe(res => {
            console.log('notification sent');
          });

        },
        (error) => console.log(error)
      );
    this.coupon = '';
    this.couponForm.reset();
  }
  generate() {
    const keylist = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890';
    const plength = 6;
    let text = '';
    for (let i = 0; i < plength; i++) {
      text += keylist.charAt(Math.floor(Math.random() * keylist.length));
    }
    this.coupon = text;
    text = '';
  }
}

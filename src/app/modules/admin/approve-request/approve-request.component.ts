import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../globalComponent/http.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-approve-request',
  templateUrl: './approve-request.component.html',
  styleUrls: ['./approve-request.component.scss']
})
export class ApproveRequestComponent implements OnInit {
  public managerList;
  public noBookings = '';
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.httpService.get('manager')
      .subscribe(
        (response) => {
          if (Object.keys(response['data']).length === 0) {
            this.noBookings = 'No Request';
          }
          this.managerList = response['data'];
        },
        (error) => console.log(error)
      );

  }
  approve(email: string) {
    const payload = {
      managerEmail: email
    };
    this.httpService.put('manager/approved', email, payload)
      .subscribe(
        (response) => {
          this.snackBar.open(' Request approved sucessfully', null, {
            duration: 2000,
          });
          this.httpService.get('manager')
            .subscribe(
              (res) => {
                this.managerList = res['data'];
                if (this.managerList.length === 0) {
                  this.noBookings = 'No Request';
                }

              },
              (error) => console.log(error)
            );
        },
        (error) => console.log(error)
      );

  }
  decline(managerEmail: string) {
    const status = confirm('Are you sure you want to reject this request?');
    if (status === true) {
      this.httpService.delete('manager/reject', managerEmail)
        .subscribe(
          (res) => {
            this.snackBar.open('Request rejected sucessfully', null, {
              duration: 2000,
            });
            this.httpService.get('manager')
              .subscribe(
                (response) => {
                  this.managerList = response['data'];
                  if (this.managerList.length === 0) {
                    this.noBookings = 'No Request';
                  }
                },
                (error) => console.log(error)
              );
          },
          (error) => console.log(error)
        );
    }

  }
}

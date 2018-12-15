import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionStorageService } from '../../../../../globalComponent/session-storage.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>,
    private sessionStorageService: SessionStorageService
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.sessionStorageService.getItem('Manager'));
    this.sessionStorageService.removeItem('Manager');
  }

  ngOnInit() { }

}

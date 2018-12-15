import { SharedModule } from '../../shared/shared.module';
import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRequestComponent } from './approve-request.component';
import { HttpService } from '../../../globalComponent/http.service';
import { MatSnackBar } from '@angular/material';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';

describe('ApproveRequestComponent', () => {
  let component: ApproveRequestComponent;
  let fixture: ComponentFixture<ApproveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRequestComponent ],
      imports: [SharedModule, ToastrModule.forRoot()],
      providers: [HttpService, MatSnackBar, GlobalHTTPErrorHandler, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit(`should create`, () => {
    expect(component).toBeTruthy();
  });

  fit(`should have noBookings as empty `, () => {
    const approveRequest = fixture.debugElement.componentInstance;
    expect(approveRequest.noBookings).toEqual('');
  });

  fit(`should have managerList as undefined `, () => {
    const approveRequest = fixture.debugElement.componentInstance;
    expect(approveRequest.managerList).toEqual(undefined);
  });
});

import { GlobalHTTPErrorHandler } from '../../../globalComponent/global-error-handler/global-http-error-handler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHistoryComponent } from './booking-history.component';
import { SharedModule } from '../../shared/shared.module';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';

describe('BookingHistoryComponent', () => {
  let component: BookingHistoryComponent;
  let fixture: ComponentFixture<BookingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingHistoryComponent ],
      imports: [SharedModule,  ToastrModule.forRoot()],
      providers: [GlobalHTTPErrorHandler, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render null in errorMessage', async(() => {
    const booking = fixture.debugElement.componentInstance;
    expect(booking.errorMessage).toEqual('');
  }));
});

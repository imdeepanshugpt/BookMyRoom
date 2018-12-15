import { SearchComponent } from '../globalComponent/search/search.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CarouselComponent } from '../core/carousel/carousel.component';
import { CouponListComponent } from '../modules/admin/coupon-list/coupon-list.component';
import { SharedModule } from '../modules/shared/shared.module';
import { GlobalHTTPErrorHandler } from '../globalComponent/global-error-handler/global-http-error-handler';
import { Toast, ToastrService, ToastPackage, ToastrModule } from 'ngx-toastr';
import { StoreModule, State } from '@ngrx/store';
describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, CarouselComponent, CouponListComponent ],
      imports: [SharedModule,  ToastrModule.forRoot(), StoreModule],
      providers: [GlobalHTTPErrorHandler, ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Deals in  h4 tag', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('Deals For You');
  }));
});

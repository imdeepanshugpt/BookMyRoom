// import { RouterTestingModule } from '@angular/router/testing';
// import { hotelViewReducers } from '../hotelStore/hotelDetail.reducers';
// import { BookingComponent } from '../../booking/booking/booking.component';
// import { SharedModule } from '../../shared/shared.module';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HotelCompareComponent } from './hotel-compare.component';
// import { Store, StoreModule} from '@ngrx/store';
// import { State, AuthState } from '../hotelStore/hotelStore.State';
// import * as HotelsAction from '../hotelStore/hotelStore.Actions';
// import * as HotelCompareActions from '../hotelStore/hotelCompare.action';
// import * as HotelDetailActions from '../hotelStore/hotelDetail.actions';
// import * as AuthAction from '../hotelStore/auth.actions';
// import { hotelCompareReducers } from '../hotelStore/hotelCompare.reducers';
// import { compareHotels } from '../hotelStore/hotelCompare.action';


// describe('HotelCompareComponent', () => {
//   let component: HotelCompareComponent;
//   let fixture: ComponentFixture<HotelCompareComponent>;
//   // let store: Store<AuthState>;
//   let store1: Store<State>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ HotelCompareComponent, BookingComponent ],
//       imports: [SharedModule, StoreModule.forRoot(hotelCompareReducers, hotelViewReducers),
//               RouterTestingModule]
//     })
//     .compileComponents();
//     fixture = TestBed.createComponent(HotelCompareComponent);
//     // store = fixture.debugElement.injector.get(Store);
//     store1 = fixture.debugElement.injector.get(Store);
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(HotelCompareComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   // fit('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });

//   // fit('should render null in compareHotels', async(() => {
//   //   const compare = fixture.debugElement.componentInstance;
//   //   expect(compare.compareHotels).toEqual([]);
//   // }));
// });

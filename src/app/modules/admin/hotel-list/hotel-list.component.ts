import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HttpService } from '../../../globalComponent/http.service';
import { Store } from '@ngrx/store';
import { State, AuthState } from '../../hotel/hotelStore/hotelStore.State';
import * as HotelAction from '../../hotel/hotelStore/hotelStore.Actions';
import { AddHotelsComponent } from '../add-hotels/add-hotels.component';
import * as viewHotelAction from '../../hotel/hotelStore/hotelDetail.actions';
import * as actions from '../../hotel/hotelStore/auth.actions';
import { LocalStorageService } from '../../../globalComponent/local-storage.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent implements OnInit {
  public hotels: Observable<{states: State[]}>;
  constructor(private httpService: HttpService,
     private store: Store<{ hotelListRed: { states: State[] } }>,
     private adminStore: Store< {auth: {states: AuthState}} >,
     private dialog: MatDialog,
     private router: Router,
     private localStorageService: LocalStorageService) {
  }
  public page = 1 ;
  public bool: boolean;
  public bool1: boolean;
  public myControl = new FormControl();
  public myControlEmail = new FormControl();
  public options;
  public options1;
  public filteredOptions: Observable<string[]>;
  public filteredOptions1: Observable<string[]>;
  public errorMessage: string;
  public errorMessage1: string;
  public rate: number;
  public searchMessage: string;
  ngOnInit() {
    this.hotels = this.store.select('hotelListRed');
    this.httpService.get('userSearch')
    .subscribe(
      (res) => {
        this.options = res;
          const index = this.options.indexOf(null);
        if (index > -1) {
           this.options.splice(index, 1);
        }
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => {
            this.bool = true;
            this.errorMessage = '';
            const filterValue = value.toLowerCase();
            if ((this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)).length === 0) {
              this.bool = false;
              this.errorMessage = 'No match found!';
            }
            return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
          })
        );
      }
    );

    this.httpService.get('userSearch/managerSearch')
    .subscribe(
      (res) => {
        this.options1 = res;
          const index1 = this.options1.indexOf(null);
        if (index1 > -1) {
           this.options1.splice(index1, 1);
        }
        this.filteredOptions1 = this.myControlEmail.valueChanges.pipe(
          startWith(''),
          map(value => {
            this.bool1 = true;
            this.errorMessage1 = '';
            const filterValue1 = value.toLowerCase();
            if ((this.options1.filter(option => option.toLowerCase().indexOf(filterValue1) === 0)).length === 0) {
              this.bool1 = false;
              this.errorMessage1 = 'No match found!';
            }
            return this.options1.filter(option => option.toLowerCase().indexOf(filterValue1) === 0);
          })
        );
      }
    );
  }

  private _filter(value: string): string[] {
    this.errorMessage = '';
    const filterValue = value.toLowerCase();
    if ((this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)).length === 0) {
    this.errorMessage = 'No match found!';
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filter1(value: string): string[] {
    this.errorMessage1 = '';
    const filterValue1 = value.toLowerCase();
    if ((this.options1.filter(option => option.toLowerCase().indexOf(filterValue1) === 0)).length === 0) {
    this.errorMessage1 = 'No match found!';
    }
    return this.options1.filter(option => option.toLowerCase().indexOf(filterValue1) === 0);
  }
  onSearch(city) {
    this.searchMessage = 'Searching by city';
    this.httpService.post('hotel', { city : city.value})
    .subscribe(
      (response: {doc: [{}]}) => {
        this.store.dispatch(new HotelAction.AddHotels(response.doc));
      },
      (error) => console.log(error)
    );
  }

  onSearchEmail(email) {
    this.searchMessage = 'Searching by manager email';
    this.httpService.post('manager/getManagerHotels', {managerEmail : email.value})
    .subscribe(
      (response) => {
        this.store.dispatch(new HotelAction.AddHotels(response));
      },
      (error) => console.log(error)
    );
  }

  onDelete(hotelRef, hotelCity) {
    console.log(hotelRef);
    if (confirm('Are you sure to delete the hotel')) {
      this.httpService.post('admin/delete', {hotelRef: hotelRef, hotelCity: hotelCity, token: localStorage.getItem('admin')})
      .subscribe(
        (response: {doc: [{}]}) => {
          this.store.dispatch(new HotelAction.AddHotels(response.doc));
          this.httpService.post('subscribe/notifySubscriber', {value: 'Hotel Deleted!'}).subscribe(res => {
            console.log('notification sent');
          });
        },
        (error) => console.log(error)
      );
    } else {
    }
  }
  onEdit(hotel) {
    this.adminStore.dispatch(new actions.AdminUpdate());
    this.store.dispatch(new viewHotelAction.ViewHotels(hotel));
    this.router.navigate(['updateHotels']);
  }
  onAdd() {
    this.localStorageService.removeItem('subAdmin');
    const openComp = this.dialog.open(AddHotelsComponent, {});
  }
}

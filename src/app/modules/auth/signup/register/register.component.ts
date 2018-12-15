import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as AuthActions from '../../../hotel/hotelStore/auth.actions';
import * as fromAuth from '../../../hotel/hotelStore/auth.actions';
import { AuthState } from '../../../hotel/hotelStore/hotelStore.State';
import { LocalStorageService } from '../../../../globalComponent/local-storage.service';
import { HttpService } from '../../../../globalComponent/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registrationForm: FormGroup;
  public options: Array<string>;
  public filteredOptions: Observable<string[]>;
  public name: string;
  public email: string;
  public presentInCities: boolean;
  public errorMessage = 'No match found!';

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if ((this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)).length === 0) {
      this.presentInCities = false;
      console.log(this.presentInCities);
    }
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private authStore: Store<AuthState>,
    private router: Router,
    private _zone: NgZone
  ) { }

  ngOnInit() {
    this.presentInCities = true;
    this.authStore.dispatch(new AuthActions.Logout());
    this.registrationForm = new FormGroup({
      'mobile': new FormControl(null, [Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[1-9][0-9]{9}$')
      ]),
      'gender': new FormControl(null, [Validators.required]),
      'age': new FormControl(null, [Validators.required, Validators.min(16), Validators.max(100)]),
      'city': new FormControl(null, [Validators.required])
    });
    this.name = this.localStorageService.getItem('name');
    this.email = this.localStorageService.getItem('email');
    this.localStorageService.clear();
    this.options = ['Agartala',
      'Agra',
      'Agumbe',
      'Ahmedabad',
      'Aizawl',
      'Ajmer',
      'Alappuzha Beach',
      'Allahabad',
      'Alleppey',
      'Almora',
      'Amarnath',
      'Amritsar',
      'Anantagir',
      'Andaman and Nicobar Islands',
      'Araku valley',
      'Aurangabad',
      'Ayodhya',
      'Badrinath',
      'Bangalore',
      'Baroda',
      'Bastar',
      'Bhagalpur',
      'Bhilai',
      'Bhimtal',
      'Bhopal',
      'Bhubaneswar',
      'Bhuj',
      'Bidar',
      'Bilaspur',
      'Bodh Gaya',
      'Calicut',
      'Chail',
      'Chamba',
      'Chandigarh',
      'Chennai',
      'Chennai Beaches',
      'Cherai',
      'Cherrapunji',
      'Chidambaram',
      'Chikhaldara Hills',
      'Chopta',
      'Coimbatore',
      'Coonoor',
      'Coorg',
      'Corbett National Park',
      'Cotigao Wild Life Sanctuary',
      'Cuttack',
      'Dadra and Nagar Haveli',
      'Dalhousie',
      'Daman and Diu',
      'Darjeeling',
      'Dehradun',
      'Delhi',
      'Devikulam',
      'Dhanaulti',
      'Dharamashala',
      'Dindigul',
      'Dudhwa National Park',
      'Dwaraka',
      'Faridabad',
      'Gandhinagar',
      'Gangotri',
      'Gangtok',
      'Gir Wildlife Sanctuary',
      'Goa',
      'Great Himalayan National Park',
      'Gulmarg',
      'Gurgaon',
      'Guruvayoor',
      'Guwahati',
      'Gwalior',
      'Hampi',
      'Haridwar',
      'Hogenakkal',
      'Horsley Hills',
      'Hyderabad',
      'Idukki',
      'Imphal',
      'Indore',
      'Itangar',
      'Jabalpur',
      'Jaipur',
      'Jaisalmer',
      'Jalandhar',
      'Jammu',
      'Jamshedpur',
      'Jodhpur',
      'Kanchipuram',
      'Kanha National Park',
      'Kanpur',
      'Kanyakumari',
      'Kargil',
      'Karwar',
      'Kausani',
      'Kedarnath',
      'Keoladeoghana National Park',
      'Khajuraho',
      'Kochi',
      'Kodaikanal',
      'Kolkata',
      'Kollam',
      'Konark',
      'Kotagiri',
      'Kottakkal and Ayurveda',
      'Kovalam',
      'Kovalam and Ayurveda',
      'Kudremukh',
      'Kullu',
      'Kumaon',
      'Kumarakom',
      'Kumarakom and Ayurveda',
      'Kumarakom Bird Sanctuary',
      'Kurukshetra',
      'Lakshadweep',
      'Lucknow',
      'Ludhiana',
      'Madurai',
      'Mahabalipuram',
      'Malpe Beach',
      'Manas National Park',
      'Mangalore',
      'Maravanthe Beach',
      'Margoa',
      'Mount Abu',
      'Mumbai',
      'Munnar',
      'Mussoorie',
      'Mysore',
      'Nahsik',
      'Nalanda',
      'Nanda Devi National Park',
      'Nandi Hills',
      'Netravali Wild Life Sanctuary',
      'Ooty',
      'Orchha',
      'Pahalgam',
      'Palakkad',
      'Panchgani',
      'Patna',
      'Patnitop',
      'Pattadakkal',
      'Periyar Wildlife Sanctuary',
      'Pithoragarh',
      'Pondicherry',
      'Pune',
      'Puri',
      'Pushkar',
      'Raipur',
      'Rajaji National Park',
      'Rajgir',
      'Rameshwaram',
      'Ranchi',
      'Ranganthittu Bird Sanctuary',
      'Ranikhet',
      'Ranthambore',
      'Rishikesh',
      'Rourkela',
      'Sanchi',
      'Saputara',
      'Sariska Wildlife Sanctuary',
      'Shillong',
      'Shimla',
      'Sohna Hills',
      'Srinagar',
      'Sunderbans',
      'Surat',
      'Tezpur',
      'Thanjavur',
      'Thiruvananthapuram',
      'Thrissur',
      'Tirunelveli',
      'Tirupati',
      'Trichy',
      'Udaipur',
      'Ujjain',
      'Vaishali',
      'Valley of Flowers',
      'Varanasi',
      'Varkala and Ayurveda',
      'Vijayawada',
      'Vishakhapatnam',
      'Vrindhavan',
      'Warangal',
      'Wayanad',
      'Wayanad Wildlife Sanctuary',
      'Yercaud',
      'Zanskar'];
      this.filteredOptions = this.registrationForm.controls.city.valueChanges.pipe(
        startWith(''),
        map(value => {
          this.errorMessage = '';
          const filterValue = value.toLowerCase();
          if ((this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)).length === 0) {
            this.errorMessage = 'No match found!';
          }
          return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
        })
      );
  }

  registerUser() {
    const customer = {
      customerName: this.name,
      customerEmail: this.email,
      customerPhoneNumber: this.registrationForm.value.mobile,
      customerGender: this.registrationForm.value.gender,
      customerAge: this.registrationForm.value.age,
      customerCity: this.registrationForm.value.city,
      customerCountry: 'India'
    };
    this.httpService.post('customer/signup-customer', customer).subscribe(
      res => {
        if (res['message'] === 'OK') {
          this.snackBar.open('You signed up successfully.', null, {
            duration: 2000,
          });
          this.authStore.dispatch(new AuthActions.Signup({
            name: this.localStorageService.getItem('name'),
            email: this.localStorageService.getItem('email')
          }));
          this.router.navigateByUrl('/');
        }
      },
      err => {
        this.snackBar.open('Please check your details and try again!', null, {
          duration: 2000,
        });
      }
    );
  }
}

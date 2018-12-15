import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/internal/Rx';
import { startWith, map } from 'rxjs/operators';
import { SwPush } from '@angular/service-worker';

import { ProfileRoutingModule } from '../../profile/profile-routing.module';
import { HttpService } from '../../../globalComponent/http.service';
import { AuthDeactivate } from '../../../globalComponent/deactivate.service';
import {AuthState} from '../../hotel/hotelStore/hotelStore.State';
import * as AuthActions from '../../hotel/hotelStore/auth.actions';
import * as fromAuth from '../../hotel/hotelStore/auth.reducers';
import { EditProfile } from '../../hotel/hotelStore/auth.actions';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  public userEmail: string;
  public userName: string;
  public userMobile: string;
  public userGender: string;
  public userAge: string;
  public userCity: string;
  public bookedroom = [];
  public history;
  public updated = false;
  public editProfile: FormGroup;
  public options: Array<string>;
  public filteredOptions: Observable<string[]>;
  public errorMessage: string;
  public disabled = false;
  public subscribe: Observable<boolean>;
  readonly VAPID_PUBLIC_KEY = 'BLhKMSmKqPS_nrTkR02A-LgdYCLd2YTVDwHYdeDBDAQOyi7SfxKnM4BcVp5cuVWx48zqrmGAfL6VJwo9QsHKUNY';

  constructor(private httpService: HttpService,
    private viewContainerRef: ViewContainerRef,
    private toastr: ToastrService,
    private router: Router,
    private swPush: SwPush) {
  }

  canDeactivate() {
    if (this.updated === true) {
      return true;
    } else {
      return false;
    }
  }

  public _filter(value: string): string[] {
    this.errorMessage = '';
    this.disabled = false;
    const filterValue = value.toLowerCase();
    if ((this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0)).length === 0) {
      this.errorMessage = 'City Not Available';
      this.disabled = true;
    }
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }



  ngOnInit() {
    this.updated = false;
    this.httpService.post('subscribe/subscribed', { email: localStorage.getItem('email')})
      .subscribe(response => {
        this.subscribe = response['status'];
      });
    this.httpService.post('customer/userdetails', { customerEmail: localStorage.getItem('email') })
      .subscribe((response) => {
        this.userName = response[0]['customerName'];
        this.userEmail = response[0]['customerEmail'];
        this.userMobile = response[0]['customerPhoneNumber'];
        this.userGender = response[0]['customerGender'];
        this.userAge = response[0]['customerAge'];
        this.userCity = response[0]['customerCity'];
      });

    this.editProfile = new FormGroup({
      'name': new FormControl(this.userName, [Validators.minLength(5), Validators.maxLength(30),
                               Validators.pattern('^[a-zA-Z][\sa-zA-Z ]*')]),
      'mobile': new FormControl(this.userMobile, [Validators.minLength(10), Validators.maxLength(10),
        Validators.pattern('^((?!0{10})\\d{10})$')]),
      'gender': new FormControl(this.userGender),
      'age': new FormControl(this.userAge, [Validators.min(16), Validators.max(100)]),
      'city': new FormControl(this.userCity)
    });

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

    this.filteredOptions = this.editProfile.get('city').valueChanges
      .pipe(
      startWith(''),
      map(value => this._filter(value))
      );
  }


  get name() {
    return this.editProfile.get('name');
  }
  get mobile() {
    return this.editProfile.get('mobile');
  }
  get city() {
    return this.editProfile.get('city');
  }
  get gender() {
    return this.editProfile.get('gender');
  }
  get age() {
    return this.editProfile.get('age');
  }


  onSubmit() {
    if (this.editProfile.value.name === null) {
      this.editProfile.value.name = this.userName;
    }
    if (this.editProfile.value.mobile === null) {
      this.editProfile.value.mobile = this.userMobile;
    }
    if (this.editProfile.value.gender === null) {
      this.editProfile.value.gender = this.userGender;
    }
    if (this.editProfile.value.age === null) {
      this.editProfile.value.age = this.userAge;
    }
    if (this.editProfile.value.city === null) {
      this.editProfile.value.city = this.userCity;
    }
    const payload = {
      customerName: this.editProfile.value.name,
      // customerEmail: this.userEmail,
      customerPhoneNumber: this.editProfile.value.mobile,
      customerGender: this.editProfile.value.gender,
      customerAge: this.editProfile.value.age,
      customerCity: this.editProfile.value.city,
      customerCountry: 'India',
    };
    this.httpService.put('customer/editdetails', this.userEmail, payload)
      .subscribe((response) => {
        this.toastr.success(JSON.stringify(response));
        this.updated = true;
        this.router.navigate(['home']);
      },
      (error) => this.toastr.error('Oops Something went wrong'));

  }
  onSubscribe() {
    console.log('onSubscribe');
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      // console.log(sub);
      this.httpService.post('subscribe/addSubscriber', {sub: sub, email: localStorage.getItem('email'), subscribed: true})
      .subscribe(res => {
        console.log(res);
        if (res['message'] === 'Subscribed') {
          this.ngOnInit();
        }
      });
    }).catch(err => console.error('Could not subscribe to notifications', err));
  }

  onUnsubscribe() {
    this.httpService.post('subscribe/unSubscribe', {email: localStorage.getItem('email')})
    .subscribe(res => {
      console.log(res);
      if (res['message'] === 'Unsubscribed') {
        this.ngOnInit();
      }
    });
  }
}

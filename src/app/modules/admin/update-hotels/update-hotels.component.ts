import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { State } from '../../hotel/hotelStore/hotelStore.State';
import { HttpService } from '../../../globalComponent/http.service';
import * as viewHotelAction from '../../hotel/hotelStore/hotelDetail.actions';


@Component({
  selector: 'app-update-hotels',
  templateUrl: './update-hotels.component.html',
  styleUrls: ['./update-hotels.component.scss']
})
export class UpdateHotelsComponent implements OnInit {

  constructor(private detailstore: Store<{ hotelViewRed: { states: State[] } }>,
    private httpService: HttpService,
    private toastr: ToastrService,
    private router: Router) { }

  public edithotels: Observable<{ states: State[] }>;
  public updateHotel: FormGroup;
  public hName: string;
  public hStreet: string;
  public hCity: string;
  public hState: string;
  public hPin: string;
  public hCountry: string;
  public hImg1: string;
  public hImg2: string;
  public hImg3: string;
  public hManagerEmail: string;
  public hRegistrationNumber: string;
  public hPrice: number;
  public hCategory: string;
  public hRoomCount: number;
  public hAc: any;
  public hWiFi: any;
  public hFood: any;
  public updated = false;
  public errorMessage: string;
  public disabled = false;
  public filteredOptions: Observable<string[]>;
  public cities = ['Agartala',
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
    'Bengaluru',
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

  public states = ['Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttarakhand',
    'Uttar Pradesh',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli',
    'Daman and Diu',
    'Delhi',
    'Lakshadweep',
    'Puducherry'];

  canDeactivate() {
    if (this.updated === true) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.edithotels = this.detailstore.select('hotelViewRed');
    this.edithotels.subscribe(response => {
      this.hName = response['hotels'][0]['hotelName'];
      this.hStreet = response['hotels'][0]['hotelAddress']['street'];
      this.hCity = response['hotels'][0]['hotelAddress']['city'];
      this.hState = response['hotels'][0]['hotelAddress']['state'];
      this.hPin = response['hotels'][0]['hotelAddress']['pin'];
      this.hCountry = response['hotels'][0]['hotelAddress']['country'];
      this.hImg1 = response['hotels'][0]['imageUrls']['img1'];
      this.hImg2 = response['hotels'][0]['imageUrls']['img2'];
      this.hImg3 = response['hotels'][0]['imageUrls']['img3'];
      this.hManagerEmail = response['hotels'][0]['managerEmail'];
      this.hRegistrationNumber = response['hotels'][0]['hotelRegistrationNumber'];
      this.hPrice = response['hotels'][0]['hotelPrice'];
      this.hCategory = response['hotels'][0]['hotelCategory'];
      this.hRoomCount = response['hotels'][0]['hotelRoomCount'];
      this.hAc = response['hotels'][0]['hotelFeatures']['ac'];
      this.hWiFi = response['hotels'][0]['hotelFeatures']['wifi'];
      this.hFood = response['hotels'][0]['hotelFeatures']['food'];
    });
    this.updateHotel = new FormGroup({
      hotelName: new FormControl(this.hName, [Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]+')]),
      hotelStreet: new FormControl(this.hStreet, [Validators.minLength(3), Validators.maxLength(100)]),
      hotelCity: new FormControl(this.hCity),
      hotelState: new FormControl(this.hState, [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]+')]),
      hotelPin: new FormControl(this.hPin, [Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9 ]+')]),
      hotelCountry: new FormControl(this.hCountry),
      hotelImg1: new FormControl(this.hImg1, [Validators.pattern('(https?:\/\/.*\.)')]),
      hotelImg2: new FormControl(this.hImg2, [Validators.pattern('(https?:\/\/.*\.)')]),
      hotelImg3: new FormControl(this.hImg3,  [Validators.pattern('(https?:\/\/.*\.)')]),
      hotelManagerEmail: new FormControl(this.hManagerEmail, [Validators.email,
      Validators.pattern('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9]+(\\.[a-z0-9]+)*(\\.(com|in))$'), Validators.minLength(10),
      Validators.maxLength(45)]),
      hotelRegistrationNumber: new FormControl(this.hRegistrationNumber,
        [Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]+'), Validators.minLength(3), Validators.maxLength(7)]),
      hotelPrice: new FormControl(this.hPrice, [Validators.pattern('^[1-9][0-9]*$')]),
      hotelCategory: new FormControl(this.hCategory),
      hotelRoomCount: new FormControl(this.hRoomCount, [Validators.pattern('[0-9]+'), Validators.max(20)]),
      hotelAc: new FormControl('YES'),
      hotelWiFi: new FormControl('YES'),
      hotelFood: new FormControl('YES'),
    });

    this.filteredOptions = this.updateHotel.get('hotelCity').valueChanges
      .pipe(
      startWith(''),
      map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    this.errorMessage = '';
    this.disabled = false;
    const filterValue = value.toLowerCase();
    if (this.cities.filter(option => option.toLowerCase().includes(filterValue)).length === 0) {
      this.errorMessage = 'City Not Available';
      this.disabled = true;
    }

    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }
  get hotelName() {
    return this.updateHotel.get('hotelName');
  }
  get hotelStreet() {
    return this.updateHotel.get('hotelStreet');
  }
  get hotelCity() {
    return this.updateHotel.get('hotelCity');
  }
  get hotelState() {
    return this.updateHotel.get('hotelState');
  }
  get hotelPin() {
    return this.updateHotel.get('hotelPin');
  }
  get hotelCountry() {
    return this.updateHotel.get('hotelCountry');
  }
  get hotelImg1() {
    return this.updateHotel.get('hotelImg1');
  }
  get hotelImg2() {
    return this.updateHotel.get('hotelImg2');
  }
  get hotelImg3() {
    return this.updateHotel.get('hotelImg3');
  }
  get hotelManagerEmail() {
    return this.updateHotel.get('hotelManagerEmail');
  }
  get hotelRegistrationNumber() {
    return this.updateHotel.get('hotelRegistrationNumber');
  }
  get hotelCategory() {
    return this.updateHotel.get('hotelCategory');
  }
  get hotelPrice() {
    return this.updateHotel.get('hotelPrice');
  }
  get hotelRoomCount() {
    return this.updateHotel.get('hotelRoomCount');
  }

  onSubmit() {
    if (this.updateHotel.value.hotelName === null) {
      this.updateHotel.value.hotelName = this.hName;
    }
    if (this.updateHotel.value.hotelStreet === null) {
      this.updateHotel.value.hotelStreet = this.hStreet;
    }
    if (this.updateHotel.value.hotelCity === null) {
      this.updateHotel.value.hotelCity = this.hCity;
    }
    if (this.updateHotel.value.hotelState === null) {
      this.updateHotel.value.hotelState = this.hState;
    }
    if (this.updateHotel.value.hotelPin === null) {
      this.updateHotel.value.hotelPin = this.hPin;
    }
    if (this.updateHotel.value.hotelCountry === null) {
      this.updateHotel.value.hotelCountry = this.hCountry;
    }
    if (this.updateHotel.value.hotelImg1 === null) {
      this.updateHotel.value.hotelImg1 = this.hImg1;
    }
    if (this.updateHotel.value.hotelImg2 === null) {
      this.updateHotel.value.hotelImg2 = this.hImg2;
    }
    if (this.updateHotel.value.hotelImg3 === null) {
      this.updateHotel.value.hotelImg3 = this.hImg3;
    }
    if (this.updateHotel.value.hotelManagerEmail === null) {
      this.updateHotel.value.hotelManagerEmail = this.hManagerEmail;
    }
    if (this.updateHotel.value.hotelRegistrationNumber === null) {
      this.updateHotel.value.hotelRegistrationNumber = this.hRegistrationNumber;
    }
    if (this.updateHotel.value.hotelPrice === null) {
      this.updateHotel.value.hotelPrice = this.hPrice;
    }
    if (this.updateHotel.value.hotelCategory === null) {
      this.updateHotel.value.hotelCategory = this.hCategory;
    }
    if (this.updateHotel.value.hotelRoomCount === null) {
      this.updateHotel.value.hotelRoomCount = this.hRoomCount;
    }
    if (this.updateHotel.value.hotelAc === null) {
      this.updateHotel.value.hotelAc = this.hAc;
    }
    if (this.updateHotel.value.hotelWiFi === null) {
      this.updateHotel.value.hotelWiFi = this.hWiFi;
    }
    if (this.updateHotel.value.hotelFood === null) {
      this.updateHotel.value.hotelFood = this.hFood;
    }

    if (this.updateHotel.value.hotelAc === 'YES') {
      this.updateHotel.value.hotelAc = true;
    } else {
      this.updateHotel.value.hotelAc = false;
    }
    if (this.updateHotel.value.hotelWiFi === 'YES') {
      this.updateHotel.value.hotelWiFi = true;
    } else {
      this.updateHotel.value.hotelWiFi = false;
    }
    if (this.updateHotel.value.hotelFood === 'YES') {
      this.updateHotel.value.hotelFood = true;
    } else {
      this.updateHotel.value.hotelFood = false;
    }
    const payload = {
      // hotelName: this.updateHotel.value.hotelName,
      hotelAddress: {
        street: this.updateHotel.value.hotelStreet,
        city: this.updateHotel.value.hotelCity,
        state: this.updateHotel.value.hotelState,
        pin: this.updateHotel.value.hotelPin,
        country: this.updateHotel.value.hotelCountry
      },
      imageUrls: {
        img1: this.updateHotel.value.hotelImg1,
        img2: this.updateHotel.value.hotelImg2,
        img3: this.updateHotel.value.hotelImg3
      },
      managerEmail: this.updateHotel.value.hotelManagerEmail,
      hotelRegistrationNumber: this.updateHotel.value.hotelRegistrationNumber,
      hotelPrice: this.updateHotel.value.hotelPrice,
      hotelCategory: this.updateHotel.value.hotelCategory,
      hotelRoomCount: this.updateHotel.value.hotelRoomCount,
      hotelFeatures: {
        ac: this.updateHotel.value.hotelAc,
        wifi: this.updateHotel.value.hotelWiFi,
        food: this.updateHotel.value.hotelFood
      },
      token: localStorage.getItem('admin')
    };
    console.log(this.updateHotel.value.hotelPrice);
    this.httpService.put('admin/updatehotel', this.hName, payload)
      .subscribe(
      (response) => {
        this.toastr.success(JSON.stringify(response));
        this.updated = true;
         this.router.navigate(['admin']);
         this.httpService.post('subscribe/notifySubscriber', {value: 'Hotel Updated!'}).subscribe(res => {
          console.log('notification sent');
        });
      },
      (error) => this.toastr.error('Oops something went wrong')
      );
  }
}

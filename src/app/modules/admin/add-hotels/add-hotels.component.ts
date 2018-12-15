import { LocalStorageService } from '../../../globalComponent/local-storage.service';
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State } from '../../hotel/hotelStore/hotelStore.State';
import { HttpService } from '../../../globalComponent/http.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-add-hotels',
  templateUrl: './add-hotels.component.html',
  styleUrls: ['./add-hotels.component.scss']
})


export class AddHotelsComponent implements OnInit {
  public managerEmail: string;
  public subAdmin = false;
  public bool: boolean;
  public errorMessage: string;
  public filteredOptions: Observable<string[]>;
  public addHotel: FormGroup;
  public rooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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
    'New Delhi',
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
  @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.dialogRef.close();
    }
  }
  constructor(
    private httpService: HttpService,
    private dialogRef: MatDialogRef<AddHotelsComponent>,
    private cd: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.managerEmail = this.localStorageService.getItem('subAdmin');
    if (this.managerEmail !== null) {
      this.subAdmin = true;
    } else {
      this.subAdmin = false;
    }
    this.addHotel = new FormGroup({
      hotelName: new FormControl(null, [Validators.required, Validators.minLength(5),
      Validators.maxLength(40), Validators.pattern('[a-zA-Z ]+')]),
      hotelAddress: new FormGroup({
        hotelStreet: new FormControl(null, [Validators.required, Validators.minLength(3),
        Validators.maxLength(60), Validators.pattern('[a-zA-Z0-9 ]+')]),
        hotelCity: new FormControl(null, Validators.required),
        hotelState: new FormControl(null, Validators.required),
        hotelPin: new FormControl(null, [Validators.required, Validators.minLength(6),
        Validators.maxLength(6), Validators.pattern('[0-9]+')]),
        hotelCountry: new FormControl(null, Validators.required),
      }),
      hotelImage: new FormGroup({
        hotelImg1: new FormControl(null, [Validators.required, Validators.pattern('^(http://|https://).+')]),
        hotelImg2: new FormControl(null, [Validators.required, Validators.pattern('^(http://|https://).+')]),
        hotelImg3: new FormControl(null, [Validators.required, Validators.pattern('^(http://|https://).+')]),
      }),
      hotelManagerEmail: new FormControl(this.managerEmail, [Validators.required, Validators.email,
      Validators.minLength(10),
      Validators.maxLength(40),
      Validators.pattern('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9]+(\\.[a-z0-9]+)*(\\.(com|in))$')]),
      hotelRegistrationNumber: new FormControl(null, [Validators.required,
      Validators.minLength(3), Validators.maxLength(3), Validators.pattern('[0-9]+')]),
      hotelPrice: new FormControl(null, [Validators.required, Validators.pattern('^[1-9][0-9]+'), Validators.minLength(3)]),
      hotelCategory: new FormControl(null, Validators.required),
      hotelRoomCount: new FormControl(20, Validators.required),
      hotelFeatures: new FormGroup({
        hotelAC: new FormControl('YES', Validators.required),
        hotelWiFi: new FormControl('YES', Validators.required),
        hotelFood: new FormControl('YES', Validators.required),
      })
    });
    this.filteredOptions = this.addHotel.get('hotelAddress.hotelCity').valueChanges
      .pipe(
      startWith(''),
      map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    this.errorMessage = '';
    this.bool = true;
    const filterValue = value.toLowerCase();
    if ((this.cities.filter(option => option.toLowerCase().includes(filterValue)).length === 0)) {
      this.bool = false;
      this.errorMessage = 'No match found!';
    }
    return this.cities.filter(option => option.toLowerCase().includes(filterValue));
  }

  get hotelName() {
    return this.addHotel.get('hotelName');
  }
  get hotelStreet() {
    return this.addHotel.get('hotelAddress.hotelStreet');
  }
  get hotelPin() {
    return this.addHotel.get('hotelAddress.hotelPin');
  }
  get hotelImg1() {
    return this.addHotel.get('hotelImage.hotelImg1');
  }
  get hotelImg2() {
    return this.addHotel.get('hotelImage.hotelImg2');
  }
  get hotelImg3() {
    return this.addHotel.get('hotelImage.hotelImg3');
  }
  get hotelManagerEmail() {
    return this.addHotel.get('hotelManagerEmail');
  }
  get hotelRegistrationNumber() {
    return this.addHotel.get('hotelRegistrationNumber');
  }
  get hotelPrice() {
    return this.addHotel.get('hotelPrice');
  }

  onAdd() {
    const hotelName = this.addHotel.get('hotelName').value;
    const hotelAddress = {
      street: this.addHotel.get('hotelAddress.hotelStreet').value,
      city: this.addHotel.get('hotelAddress.hotelCity').value,
      state: this.addHotel.get('hotelAddress.hotelState').value,
      pin: this.addHotel.get('hotelAddress.hotelPin').value,
      country: this.addHotel.get('hotelAddress.hotelCountry').value
    };
    const imageUrls = {
      img1: this.addHotel.get('hotelImage.hotelImg1').value,
      img2: this.addHotel.get('hotelImage.hotelImg2').value,
      img3: this.addHotel.get('hotelImage.hotelImg3').value
    };
    const managerEmail = this.addHotel.get('hotelManagerEmail').value;
    const hotelRegistrationNumber = this.addHotel.get('hotelRegistrationNumber').value;
    const hotelPrice = this.addHotel.get('hotelPrice').value;
    const hotelCategory = this.addHotel.get('hotelCategory').value;
    const hotelRoomCount = this.addHotel.get('hotelRoomCount').value;
    const hotelFeatures = {
      ac: (this.addHotel.get('hotelFeatures.hotelAC').value === 'YES'),
      wifi: (this.addHotel.get('hotelFeatures.hotelWiFi').value === 'YES'),
      food: (this.addHotel.get('hotelFeatures.hotelFood').value === 'YES')
    };
    const hotelAverageRating = 4;
    const hotelReviews = [];
    const hotelDiscount = 10;
    const finalhotel = {
      hotelName,
      hotelAddress,
      imageUrls,
      managerEmail,
      hotelRegistrationNumber,
      hotelPrice,
      hotelCategory,
      hotelRoomCount,
      hotelFeatures,
      hotelAverageRating,
      hotelReviews,
      hotelDiscount
    };
    const token = localStorage.getItem('admin');
    this.httpService.post('admin/add', { finalhotel}).subscribe((response: { status: string, doc: {} }) => {
      if (response.status === 'EXIST') {
        alert('Hotel already Exists');
      } else if (response.status === 'ADDED') {
        this.dialogRef.close();
        this.httpService.post('subscribe/notifySubscriber', { value: 'New HotelAdded!' }).subscribe(res => {
          console.log('notification sent');
        });
        alert('Hotel Added');
      } else {
        alert('Something went wrong, try again');
      }
    });
  }
  onClose() {
    this.dialogRef.close();
    this.localStorageService.removeItem('subAdmin');
  }
}

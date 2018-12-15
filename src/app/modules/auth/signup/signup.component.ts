import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, startWith } from 'rxjs/operators';
import { SessionStorageService } from '../../../globalComponent/session-storage.service';
import { AuthState } from '../../hotel/hotelStore/hotelStore.State';
import { LocalStorageService } from '../../../globalComponent/local-storage.service';
import { HttpService } from '../../../globalComponent/http.service';
import { FirebaseService } from '../../../globalComponent/firebase.service';
import { HeaderComponent } from '../../../core/header/header.component';
import * as AuthActions from '../../hotel/hotelStore/auth.actions';
import * as fromAuth from '../../hotel/hotelStore/auth.reducers';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm: FormGroup;
  public options: Array<string>;
  public filteredOptions: Observable<string[]>;
  public errorMessage: string;
  public isManager = 'false';
  constructor(
    private firebaseService: FirebaseService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar,
    private localStorageService: LocalStorageService,
    private authStore: Store<AuthState>,
    private _zone: NgZone) { }



  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    this.isManager = this.sessionStorageService.getItem('Manager');

    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]+')]),
      'email': new FormControl(null, [Validators.required, Validators.email,
      Validators.pattern('^[_a-z0-9-]+(\\.[_a-z0-9-]+)*@[a-z0-9]+(\\.[a-z0-9]+)*(\\.(com|in))$'),
      // [a-z0-9_]((a-z0-9)+(.-_)?(a-z0-9)+)+@[a-z]+\.(com|in)
      Validators.min(10),
      Validators.max(45)]),
      'password': new FormControl(null, [Validators.required,
      Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'),
      Validators.minLength(8),
      Validators.maxLength(15)]),
      'mobile': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('^[1-9][0-9]{9}$')]),
      'gender': new FormControl(null, [Validators.required]),
      'age': new FormControl(null, [Validators.required, Validators.min(16), Validators.max(100)]),
      'city': new FormControl(null, [Validators.required])
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
    this.filteredOptions = this.signupForm.controls.city.valueChanges.pipe(
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

  googleSignUp() {
    this.firebaseService.googleLogin()
      .then(
        res => {
          this.firebaseService.getDialogRef().close();
          this.localStorageService.setItem('name', res.user.displayName);
          this.localStorageService.setItem('email', res.user.email);
          this.localStorageService.setItem('refresh-token', res.user.refreshToken);
          this.httpService.post('customer/get-customer',
            {
              customerEmail: this.localStorageService.getItem('email')
            })
            .subscribe(
              result => {
                console.log(result);
                if (result['message'] === 'OK' && result['data'] && res.user) {
                  if (result['data'] && res.user) {
                    this._zone.run(() => {
                      this.snackBar.open('You are signed in.', null, {
                        duration: 2000,
                      });
                      this.authStore.dispatch(new AuthActions.Signin({
                        name: this.localStorageService.getItem('name'),
                        email: this.localStorageService.getItem('email')
                      }));
                    }
                    );
                  } else {
                    this._zone.run(() => {
                      this.router.navigateByUrl('register');
                    });
                  }
                }
              });
        }
      )
      .catch(
        error => this.snackBar.open(error.message, null, {
          duration: 2000,
        })
      );
  }
  managerSignup() {
    this.firebaseService.signup(this.signupForm.value.email, this.signupForm.value.password)
      .then(res => {
        console.log(res);
        const payload: object = {
          managerName: this.signupForm.value.name,
          managerEmail: res.user.email,
          managerToken: res.user.refreshToken,
          approvalStatus : false,
          managerPhoneNumber: this.signupForm.value.mobile,
          managerGender: this.signupForm.value.gender,
          managerAge: this.signupForm.value.age,
          managerCity: this.signupForm.value.city,
          managerCountry: 'India'
        };
        this.httpService.post('manager/signup-manager', payload)
          .subscribe(
            result => {
              console.log(result);
              if (result['message'] === 'OK') {
                this.snackBar.open('Your sign up resquest sended successfully.', null, {
                  duration: 2000,
                });

                // this.authStore.dispatch(new AuthActions.Signup({
                //   name: this.localStorageService.getItem('name'),
                //   email: this.localStorageService.getItem('email')
                // }));
                this.firebaseService.getDialogRef().close();
              } else {
                this.snackBar.open('Please check your details and try again!', null, {
                  duration: 2000,
                });
              }
            },
            err => {
              this.snackBar.open('An error occured. Please try again.', null, {
                duration: 2000,
              });
            }
          );
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.snackBar.open(errorMessage, null, {
          duration: 2000,
        });
      });
  }
  signupFb() {
    this.firebaseService.signup(this.signupForm.value.email, this.signupForm.value.password)
      .then(res => {
        console.log(res);
        const payload: object = {
          customerName: this.signupForm.value.name,
          customerEmail: res.user.email,
          customerIdToken: res.user.refreshToken,
          customerPhoneNumber: this.signupForm.value.mobile,
          customerGender: this.signupForm.value.gender,
          customerAge: this.signupForm.value.age,
          customerCity: this.signupForm.value.city,
          customerCountry: 'India'
        };
        this.httpService.post('customer/signup-customer', payload)
          .subscribe(
            result => {
              console.log(result);
              if (result['message'] === 'OK') {
                this.snackBar.open('You signed up successfully.', null, {
                  duration: 2000,
                });
                this.localStorageService.setItem('name', this.signupForm.value.name);
                this.localStorageService.setItem('email', res.user.email);
                this.localStorageService.setItem('refresh-token', res.user.refreshToken);

                this.authStore.dispatch(new AuthActions.Signup({
                  name: this.localStorageService.getItem('name'),
                  email: this.localStorageService.getItem('email')
                }));
                this.firebaseService.getDialogRef().close();
              } else {
                this.snackBar.open('Please check your details and try again!', null, {
                  duration: 2000,
                });
              }
            },
            err => {
              this.snackBar.open('An error occured. Please try again.', null, {
                duration: 2000,
              });
            }
          );
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.snackBar.open(errorMessage, null, {
          duration: 2000,
        });
      });
  }
}

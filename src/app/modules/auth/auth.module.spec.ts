import { LoginComponent } from './login/login.component';
import { AuthModule } from './auth.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';



describe('AuthModule', () => {
  let authModule: AuthModule;

  beforeEach(() => {
    authModule = new AuthModule();
  });

  it('should create an instance', () => {
    expect(authModule).toBeTruthy();
  });
});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
   //   providers: [H],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { isArray } from 'util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityStatisticComponent } from './city-statistic.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import { single } from './data';
describe('CityStatisticComponent', () => {
  let component: CityStatisticComponent;
  let fixture: ComponentFixture<CityStatisticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityStatisticComponent ],
      imports: [NgxChartsModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityStatisticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit(`should create`, () => {
    expect(component).toBeTruthy();
  });

  fit(`single should be object`, () => {
    const cityStatics = fixture.debugElement.componentInstance;
    expect(typeof(cityStatics.single)).toEqual('object');
  });

  fit(` cityStatics should be object`, () => {
    const cityStatics = fixture.debugElement.componentInstance;
    expect(typeof(cityStatics.view)).toEqual('object');
  });

  fit(` view of 0 to equal 700`, () => {
    const cityStatics = fixture.debugElement.componentInstance;
    expect(cityStatics.view[0]).toEqual(700);
  });
});

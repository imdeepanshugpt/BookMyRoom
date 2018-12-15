import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelsComponent } from './update-hotels.component';

describe('UpdateHotelsComponent', () => {
  let component: UpdateHotelsComponent;
  let fixture: ComponentFixture<UpdateHotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHotelsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

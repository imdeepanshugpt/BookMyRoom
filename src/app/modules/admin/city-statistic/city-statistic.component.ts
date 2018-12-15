import { Component, OnInit } from '@angular/core';
import { single } from './data';
@Component({
  selector: 'app-city-statistic',
  templateUrl: './city-statistic.component.html',
  styleUrls: ['./city-statistic.component.scss']
})
export class CityStatisticComponent implements OnInit {
  public single: any[];
  public multi: any[];
  public view: any[] = [700, 400];
  public showLegend = true;
  public colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#92a8d1', '#034f84', '#f7cac9', '#f7786b', '#fefbd8', '#4040a1']
  };
  public showLabels = false;
  public explodeSlices = false;
  public doughnut = false;
  constructor() {
    Object.assign(this, { single });
  }
  ngOnInit() {
  }
  onSelect(event) {
  }
}

import { Component, OnInit } from '@angular/core';
import { SliderDataService } from '../../services/slider-data.service';
import { ColorDataService } from '../../services/color-data.service';

@Component({
  selector: 'app-color-control',
  templateUrl: './color-control.component.html',
  styleUrls: ['./color-control.component.scss']
})
export class ColorControlComponent implements OnInit {
  colorSetIndicators: Array<string> = ['#46aeb4','#315178','#a19ed9','#dddddd','#953b4f'];
  colorSet: number = 1;
  isCycling: boolean;

  constructor(private colorDataService: ColorDataService) { }

  ngOnInit() {
    this.colorDataService.castColorSet.subscribe(dataSet => {
      this.colorSet = dataSet;
    });
    this.colorDataService.castCycling.subscribe(isCycling => {
      this.isCycling = isCycling;
    });
  }

  toggleCycling() {
    this.colorDataService.toggleCycling(!this.isCycling);
  }

  setColor(i) {
    this.colorDataService.getColorSet(i);
  }
}

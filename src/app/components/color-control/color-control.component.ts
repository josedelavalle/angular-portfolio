import { Component, OnInit } from '@angular/core';
import { Icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faCircle, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-color-control',
  templateUrl: './color-control.component.html',
  styleUrls: ['./color-control.component.scss']
})
export class ColorControlComponent implements OnInit {
  colorSetIndicators: Array<string> = ['#46aeb4','#315178','#a19ed9','#dddddd','#953b4f'];
  colorSet: number = 1;
  isCycling!: boolean;
  faPlay: IconDefinition = faPlay;
  faPause: IconDefinition = faPause;
  faCircle: IconDefinition = faCircle;
  faCheckCircle: IconDefinition = faCheckCircle;

  constructor(private colorDataService: ColorService) { }

  ngOnInit() {
    this.colorDataService.castColorSet.subscribe((dataSet: number) => {
      this.colorSet = dataSet;
    });
    this.colorDataService.castCycling.subscribe((isCycling: boolean) => {
      this.isCycling = isCycling;
    });
  }

  toggleCycling() {
    this.colorDataService.toggleCycling(!this.isCycling);
  }

  setColor(i: any) {
    this.colorDataService.getColorSet(i);
  }
}

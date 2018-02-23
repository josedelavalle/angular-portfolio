import { Component, OnInit, Input } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
import { SliderDataService } from '../../services/slider-data.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  @Input() footerHidden: boolean;
  dataSet: number = 1;
  iframeUrl: {};
  constructor(private sliderDataService: SliderDataService, private sanitizer: DomSanitizer) { }

  updateIframe() {
    switch (this.dataSet) {
      case 1:
        return "http://ngpopulation.josedelavalle.com";
      case 2:
        return "http://ngnews.josedelavalle.com";
      case 3:
        return "http://nggallery.josedelavalle.com";
      case 4:
        return "http://ngstates.josedelavalle.com";
      case 5:
        return "http://ngnasa.josedelavalle.com";
      default:
        return "http://josedelavalle.com";
    }
  }

  ngOnInit() {
    this.sliderDataService.cast.subscribe(dataSet => {
      this.dataSet = dataSet;
      this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.updateIframe());
    });
  }

}

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
  fullscreen: boolean = false;
  hashbang: string = '';
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
      case 6:
        return "http://josedelavalle.com" + this.hashbang;
    }
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    this.footerHidden = this.fullscreen;
  }

  ngOnInit() {
    //get hashbang before switching iframe url
    this.sliderDataService.castHash.subscribe(hashbang => {
      this.hashbang = hashbang;
      this.sliderDataService.cast.subscribe(dataSet => {
        this.dataSet = dataSet;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.updateIframe());
      });
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';
import { SliderService } from '../../services/slider.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IframeComponent implements OnInit {
  @Input() footerHidden!: boolean;
  faMinimize : IconDefinition = faMinimize;
  faMaximize : IconDefinition = faMaximize;
  dataSet: number = 1;
  iframeUrl!: {};
  fullscreen: boolean = false;
  hashbang: string = '';
  constructor(private sliderDataService: SliderService, private sanitizer: DomSanitizer) { }

  updateIframe() {
    switch (this.dataSet) {
      case 1:
        return "https://ngpopulation.josedelavalle.com";
      // case 2:
      //   return "//ngnews.josedelavalle.com";
      case 2:
        return "https://nggallery.josedelavalle.com";
      case 3:
        return "https://ngstates.josedelavalle.com";
      case 4:
        return "https://ngnasa.josedelavalle.com";
      case 5:
        return "https://me.slickwebstudio.com" + this.hashbang;
    }
    return '';
  }

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
    this.footerHidden = this.fullscreen;
  }

  ngOnInit() {
    //get hashbang before switching iframe url
    this.sliderDataService.castHash.subscribe((hashbang: string) => {
      this.hashbang = hashbang;
      this.sliderDataService.cast.subscribe((dataSet: number) => {
        this.dataSet = dataSet;
        this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.updateIframe());
      });
    });
  }

}

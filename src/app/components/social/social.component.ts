import { Component } from '@angular/core';
import { faGithub, faLinkedin, faTwitter, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent {
  constructor(private sliderDataService: SliderService) { }
  faTwitter: IconDefinition = faTwitter;
  faLinkedin: IconDefinition = faLinkedin;
  faGithub: IconDefinition = faGithub;
  faEnvelope: IconDefinition = faEnvelope;
  goToContactForm() {
    this.sliderDataService.setHashbang('#contact');
    this.sliderDataService.setDataSet(6);
  }
}

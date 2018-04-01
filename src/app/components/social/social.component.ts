import { Component, OnInit } from '@angular/core';
import { SliderDataService } from '../../services/slider-data.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss']
})
export class SocialComponent implements OnInit {

  constructor(private sliderDataService:SliderDataService) { }

  ngOnInit() {
  }

  goToContactForm() {
    this.sliderDataService.setHashbang('#contact');
    this.sliderDataService.setDataSet(6);
  }
}

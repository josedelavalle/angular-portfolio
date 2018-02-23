import { Component, OnInit, Input } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
  providers: [NgbCarouselConfig]
})
export class TechComponent implements OnInit {
  @Input() rowCount: number;

  constructor(config: NgbCarouselConfig) { 
    config.interval = 3000;
    config.wrap = true;
    config.keyboard = true;
  }

  ngOnInit() {
  }

}

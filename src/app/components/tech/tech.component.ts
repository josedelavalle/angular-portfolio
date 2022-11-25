import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styleUrls: ['./tech.component.scss'],
  providers: []
})
export class TechComponent implements OnInit {
  @Input() rowCount!: number;

  constructor() { 
    
  }

  ngOnInit() {
  }

}

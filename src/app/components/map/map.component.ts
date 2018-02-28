import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserDataService } from '../../services/user-data.service';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  lat: Number = 0;
  lng: Number = 0;
  userData: any;
  //zoom: Number = 14;
  @ViewChild(AgmMap) myMap: any;
  dir: any = null;

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.getUserData().subscribe(userData => { 
      this.userData = userData;
      this.lat = Number(this.userData.loc.split(",")[0]);
      this.lng = Number(this.userData.loc.split(",")[1]);
      this.setDirections();
    });
  }

  setDirections() {
    this.dir = {
      origin: { lat: this.lat, lng: this.lng },
      destination: { lat: 40.6693, lng: -74.6804 }
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.myMap.triggerResize()
      .then(() =>  this.setDirections()
  )}

}

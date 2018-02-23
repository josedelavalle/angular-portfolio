import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserDataService } from '../../services/user-data.service';

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

  dir: any = null;
    
  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.getUserData().subscribe(userData => { 
      this.userData = userData;
      var lat = Number(this.userData.loc.split(",")[0]);
      var lng = Number(this.userData.loc.split(",")[1]);
      this.dir = {
        origin: { lat: lat, lng: lng },
        destination: { lat: 40.6693, lng: -74.6804 }
      }
    });
  }

}

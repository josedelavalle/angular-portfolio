import { Component, OnInit } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  directionsResults$: Observable<google.maps.DirectionsResult | undefined> | undefined;

  constructor(mapDirectionsService: MapDirectionsService,
    userDataService: UserService) {
    console.log('map component')
    
    let setDirections = (lat: number, lng: number) => {
      let request: google.maps.DirectionsRequest = {
        destination: { lat: 40.6693, lng: -74.6804 },
        origin: {lat: lat, lng: lng},
        travelMode: google.maps.TravelMode.DRIVING
      };
      console.log('lng', request)
      this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
    }
    userDataService.getPosition().then((pos: any) => {
      console.log('get position', pos);
      setDirections(pos.lat, pos.lng);
    }).catch(() => {
      userDataService.getUserData().subscribe((userData: any) => { 
        let lat = Number(userData.loc.split(",")[0]);
        let lng = Number(userData.loc.split(",")[1]);
        setDirections(lat, lng);
  
      });
    })
    

  }
  center: google.maps.LatLngLiteral = {
    lat: 40.6693, lng: -74.6804
  };
  zoom = 12;
  
}

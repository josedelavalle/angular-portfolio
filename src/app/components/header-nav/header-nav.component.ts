import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SliderDataService } from '../../services/slider-data.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
})
export class HeaderNavComponent implements OnInit, OnDestroy {
  dataSet: number;
  userData: any;
  weatherData: any;
  maxDataSets: number;

  constructor(private userDataService: UserDataService, private sliderDataService:SliderDataService) { }

  sliderChanged() {
    this.sliderDataService.setDataSet(this.dataSet);
  }
  next() {
    this.sliderDataService.nextDataSet();
  }
  prev() {
    this.sliderDataService.prevDataSet();
  }
  changeApp(i) {
    this.sliderDataService.setDataSet(i);
  }
  ngOnInit() {
    this.sliderDataService.cast.subscribe(dataSet => this.dataSet = dataSet);
    this.userDataService.getUserData().subscribe(userData => { 
      this.userData = userData;
      var lat = this.userData.loc.split(",")[0];
      var lon = this.userData.loc.split(",")[1];
      var country = this.userData.country;
      this.userDataService.getUserWeather(lat, lon, country).subscribe(weatherData => {
        this.weatherData = weatherData;
        // United States locations return temperature in Fahrenheit else Celsius
        this.weatherData.main.unit = (country == 'US') ? 'F' : 'C';
      });
    });
    this.maxDataSets = this.sliderDataService.maxDataSet;
  }

  ngOnDestroy() {

  }
}

import { Component, OnInit, OnDestroy} from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SliderDataService } from '../../services/slider-data.service';
import { UserDataService } from '../../services/user-data.service';
import { ColorDataService } from '../../services/color-data.service';

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
  isCycling: boolean;
  ticks: number = 0;
  timerMax: number = 100;
  timer: Observable<any> = null;
  dateNow : Date = new Date();
  private subscription: Subscription;

  constructor(private userDataService: UserDataService, private colorDataService: ColorDataService, private sliderDataService:SliderDataService) { }

  sliderChanged() {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.setDataSet(this.dataSet);
  }
  next() {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.nextDataSet();
  }
  prev() {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.prevDataSet();
  }
  changeApp(i) {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.setDataSet(i);
  }
  goToHeatmap() {
    this.sliderDataService.setHashbang('#map');
    this.sliderDataService.setDataSet(6);
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
    this.colorDataService.castCycling.subscribe(isCycling => {
      this.isCycling = isCycling;
      if (this.isCycling) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
    this.timer = Observable.timer(1, this.timerMax).take(100).repeat();

  }

  startTimer() {
    console.log('toggle');
    this.subscription = this.timer.subscribe(t => {
        this.ticks = t;
        if (this.ticks == 99) {
          this.colorDataService.nextDataSet();
        }
      }
    );
  }

  stopTimer() {
    this.ticks = 0;
    if (this.subscription)
      this.subscription.unsubscribe();
  }

  ngOnDestroy() {

  }
}

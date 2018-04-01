import { Component, OnInit, OnDestroy, ApplicationRef} from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { SliderDataService } from '../../services/slider-data.service';
import { UserDataService } from '../../services/user-data.service';
import { ColorDataService } from '../../services/color-data.service';
import { MatSnackBar } from '@angular/material';

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

  descriptions : Array<string> = [
    'Add countries to the app in order to compare and contrast various country populations broken down by year, gender, and age.  Click anywhere on the map to add that country\'s population to the data set or drag the marker to the country of your choice.',
    'Internet news from the top media sources collated all under one roof, just for you.  Read current articles from your favorite outlets homepage, in realtime. Pick a source to peruse their recently published articles, or search all by keyword. Want something random?  Press "explore"',
    'App will default to finding photos uploaded to Flckr taken at wherever you currently are in the world, use the map to explore at your leasure, or simply type in what you are looking for.',
    'Drill down to your desired US State to find interactive county results.  Explore photos taken at that location, along with maps, and links to the official local government websites.',
    'A Datepicker lets you check out the Pic of The Day from NASA, MARS Rover image history, satelite imagery for your desired location and more.',
    'A website about me, what I do, what I have done, and what I could do in the future.  Thanks for visiting!  I\'d love to hear from you, fill out the form at the bottom to drop me a line.'
  ];
  private subscription: Subscription;

  constructor(private applicationRef: ApplicationRef,
    private userDataService: UserDataService, 
    private colorDataService: ColorDataService, 
    private sliderDataService:SliderDataService, 
    public snackBar: MatSnackBar
  ) { }

  sliderChanged() {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.setDataSet(this.dataSet);
    this.openSnackBar();
  }
  next() {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.nextDataSet();
    this.openSnackBar();
  }
  prev() {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.prevDataSet();
    this.openSnackBar();
  }
  changeApp(i) {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.setDataSet(i);
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open(this.descriptions[this.dataSet - 1], 'Close', {
      verticalPosition: 'top',
      duration: 12000
    });
  }
  
  goToHeatmap() {
    this.sliderDataService.setHashbang('#map');
    this.sliderDataService.setDataSet(6);
  }

  goToContactForm() {
    this.sliderDataService.setHashbang('#contact');
    this.sliderDataService.setDataSet(6);
  }

  ngOnInit() {
    this.sliderDataService.cast.subscribe(dataSet => this.dataSet = dataSet);
    this.userDataService.getUserData().subscribe(userData => { 
      this.userData = userData;
      var lat = this.userData.loc.split(",")[0];
      var lon = this.userData.loc.split(",")[1];
      var country = this.userData.country;
      // we need to get the user's location before the weather there
      this.userDataService.getUserWeather(lat, lon, country).subscribe(weatherData => {
        this.weatherData = weatherData;
        // United States locations return temperature in Fahrenheit else Celsius
        this.weatherData.main.unit = (country == 'US') ? 'F' : 'C';
      });

      // this is stable wrapper needed in order for Service Worker to be registered on browser
      //this.applicationRef.isStable.subscribe((s) => {
      //  if (s) {
          this.timer = Observable.timer(1, this.timerMax).take(100).repeat();
      //  }
      //});

      //update the time in the view
      //this.applicationRef.isStable.subscribe((s) => {
      //  if (s) {
          setInterval(() => {
            this.dateNow = new Date();
          }, 1000);
      //  }
      //});

      this.applicationRef.isStable.subscribe(t => {
        console.log('App stable: ' + t);
      });

      this.openSnackBar();
    });
    
    // color changing service
    this.maxDataSets = this.sliderDataService.maxDataSet;
    this.colorDataService.castCycling.subscribe(isCycling => {
      this.isCycling = isCycling;
      if (this.isCycling) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
    
    

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

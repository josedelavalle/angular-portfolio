import { ApplicationRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
import { ColorService } from 'src/app/services/color.service';
import { SliderService } from 'src/app/services/slider.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBars, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  dataSet!: number;
  userData: any;
  weatherData: any;
  maxDataSets!: number;
  isCycling!: boolean;
  ticks: number = 0;
  timerMax: number = 50;
  timer: Observable<any> | null = null;
  dateNow : Date = new Date();
  faLeft: IconDefinition = faChevronLeft;
  faRight: IconDefinition = faChevronRight;
  faBars: IconDefinition = faBars;

  descriptions : Array<string> = [
    'Click on map to browse photos taken at that location',
    // 'Internet news from the top media sources collated all under one roof, just for you.  Read current articles from your favorite outlets homepage, in realtime. Pick a source to peruse their recently published articles, or search all by keyword. Want something random?  Press "explore"',
    'App will default to finding photos uploaded to Flckr taken at wherever you currently are in the world, use the map to explore at your leasure, or simply type in what you are looking for.',
    'Drill down to your desired US State to find interactive county results.  Explore photos taken at that location, along with maps, and links to the official local government websites.',
    'A Datepicker lets you check out the Pic of The Day from NASA, MARS Rover image history, satelite imagery for your desired location and more.',
    'A website about me, what I do, what I have done, and what I could do in the future.  Thanks for visiting!  I\'d love to hear from you, fill out the form at the bottom to drop me a line.'
  ];
  private subscription!: Subscription;

  constructor(private applicationRef: ApplicationRef,
    private userDataService: UserService, 
    private colorDataService: ColorService, 
    private sliderDataService:SliderService, 
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
  changeApp(i: number) {
    this.sliderDataService.setHashbang('');
    this.sliderDataService.setDataSet(i);
    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open(this.descriptions[this.dataSet - 1], 'Close', {
      verticalPosition: 'bottom',
      duration: 12000
    });
    
  }
  
  goToHeatmap() {
    this.sliderDataService.setHashbang('#map');
    this.sliderDataService.setDataSet(this.sliderDataService.maxDataSet);
  }

  goToContactForm() {
    this.sliderDataService.setHashbang('#contact');
    this.sliderDataService.setDataSet(this.sliderDataService.maxDataSet);
  }

  ngOnInit() {
    // setInterval(() => {
    //   console.log('window', window)
    //   window.dispatchEvent(new Event('resize'));  
    // }, 2000);
    
    this.timer = timer(1, this.timerMax).pipe(take(50)).pipe(repeat());
    this.sliderDataService.cast.subscribe(dataSet => this.dataSet = dataSet);
    this.userDataService.getUserData().subscribe((userData: any) => { 
      this.userData = userData;
      var lat = this.userData.loc.split(",")[0];
      var lon = this.userData.loc.split(",")[1];
      var country = this.userData.country;
      // we need to get the user's location before the weather there
      this.userDataService.getUserWeather(lat, lon, country).subscribe((weatherData: any) => {
        this.weatherData = weatherData;
        // United States locations return temperature in Fahrenheit else Celsius
        this.weatherData.main.unit = (country == 'US') ? 'F' : 'C';
      });

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
      console.log('isCycling', isCycling)
      if (this.isCycling) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    });
    
    

  }

  startTimer() {
    console.log('toggle');
    if (!this.timer) return;
    this.subscription = this.timer.subscribe(t => {
        this.ticks = t;
        if (this.ticks == 49) {
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

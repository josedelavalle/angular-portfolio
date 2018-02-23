import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserDataService {
  readonly userDataURL: string = 'http://ipinfo.io/json';
  readonly userWeatherURL: string = 'http://api.openweathermap.org/data/2.5/weather';
  readonly apiKey: string = '3e2c248c8a21fbe1997eb778a2f2c36c';
  constructor(private http: HttpClient) { 
  
  }
  getUserData() {
    return this.http.get(this.userDataURL);
  }

  getUserWeather(lat, lon, country) {
    var uriParameters = "?lat=" + lat + "&lon=" + lon + "&appid=" + this.apiKey + "&units=";
    uriParameters += (country == "US") ? 'imperial' : 'metric';
    return this.http.get(this.userWeatherURL + uriParameters);
  }
}

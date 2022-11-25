import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly useApiKey: boolean = false;
  readonly userDataURL: string = '//ipinfo.io/json';
  readonly userWeatherURL: string = '//api.openweathermap.org/data/2.5/weather';
  readonly weatherApiToken: string = '11d2d8574eb3e4';
  readonly apiKey: string = '3e2c248c8a21fbe1997eb778a2f2c36c';
  constructor(private http: HttpClient) { 
  
  }
  getUserData() {
    let url = this.userDataURL + (this.useApiKey ? `?token=${this.weatherApiToken}`: '');
    return this.http.get(url);
  }

  getUserWeather(lat: string, lon: string, country: string) {
    let uriParameters = "?lat=" + lat + "&lon=" + lon + "&appid=" + this.apiKey + "&units=";
    uriParameters += (country == "US") ? 'imperial' : 'metric';
    return this.http.get(this.userWeatherURL + uriParameters);
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });
  }
  
}

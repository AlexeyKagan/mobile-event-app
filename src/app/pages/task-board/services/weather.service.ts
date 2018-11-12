import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const OPEN_WEATHER_MAP_API = {
  url: 'http://api.openweathermap.org/data/2.5/weather',
  appid: '6b19232ef146adecb4a1f928c4c9812a'
}

interface Coordinates {
  lat: number,
  lon: number,
}

@Injectable()
export class WeatherService {
  constructor(
    private http: HttpClient,
    ) {}

  private geolocation: Geolocation = window.navigator.geolocation;
  private lat: number;
  private lon: number;

  fetchWeather(): Observable<any> {
    const url = this.getWeatherUrl();

    return this.http.get(url);
  }

  async initCurrentCoordinates(): Promise<any> {
    const config = { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 };
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        config
      );
    })
    .then(position => this.setCoordiantes(position))
    .catch(err => console.error(err),);

  }

  setCoordiantes(position) {
    const { coords: { latitude: lat, longitude: lon } } = position;

    this.lat = lat;
    this.lon = lon;
  }

  getWeatherUrl(): string {
    const { url, appid } = OPEN_WEATHER_MAP_API;

    return `${url}?lat=${this.lat}&lon=${this.lon}&appid=${appid}`;
  } 
 
}
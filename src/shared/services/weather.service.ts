import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Weather, WeatherResponse} from "../models/weather";
import { EMPTY_WEATHER } from '../constants';
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http: HttpClient = inject(HttpClient);

  // Define API
  apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=lasvegas&appid=af359f015a2971e60c1764841023507c';

  getWeather(): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(`${this.apiURL}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

  generateWeather(weatherResponse: WeatherResponse): Weather {
    let weather: Weather = EMPTY_WEATHER;
    weather.name = weatherResponse.name;
    let sunsetTime = new Date(weatherResponse.sys.sunset * 1000);
    weather.sunsetTime = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    weather.isDay = (currentDate.getTime() < sunsetTime.getTime());
    weather.tempCelsius = (weatherResponse.main.temp - 273.15).toFixed(0);
    weather.tempMin = (weatherResponse.main.temp_min - 273.15).toFixed(0);
    weather.tempMax = (weatherResponse.main.temp_max - 273.15).toFixed(0);
    weather.tempFeelsLike = (weatherResponse.main.feels_like - 273.15).toFixed(0);
    weather.humidity = weatherResponse.main.humidity;
    return weather;
  }
}

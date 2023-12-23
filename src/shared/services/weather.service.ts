import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bike } from '../models/bike';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Weather, WeatherResponse} from "../models/weather";
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http: HttpClient = inject(HttpClient);

  // Define API
  apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=lasvegas&appid=ff1bc4683fc7325e9c57e586c20cc03e';

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
}

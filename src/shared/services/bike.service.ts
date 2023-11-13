import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bike } from '../models/bike';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BikeService {
  // Define API
  apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
    }),
  };
  // HttpClient API get() method => Fetch Bikes list
  getBikes(): Observable<Bike[]> {
    return this.http
      .get<Bike[]>(`${this.apiURL}/bikes/`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API get() method => Fetch Bike
  getBike(id: number): Observable<Bike> {
    return this.http
      .get<Bike>(`${this.apiURL}/bikes/${id}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API post() method => Create Bike
  createBike(bike: Bike): Observable<number> {
    return this.http
      .post<number>(
        `${this.apiURL}/bikes`,
        JSON.stringify(bike),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API put() method => Update Bike
  updateBike(bike: Bike): Observable<Bike> {
    return this.http
      .put<Bike>(
        `${this.apiURL}/bikes`,
        JSON.stringify(bike),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete Bike
  deleteBike(id: number) {
    return this.http
      .delete<Bike>(`${this.apiURL}/bikes/${id}`, this.httpOptions)
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

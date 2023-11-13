import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bike } from '../models/bike';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ImageService {
  // Define API
  apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT,HEAD',
    }),
    reportProgress: true,
  };
  // HttpClient API post() method => Create Image
  addImage(bikeId: string, image: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('id', bikeId);
    formData.append('image', image);
    return this.http
      .post<any>(
        `${this.apiURL}/images`,
        formData,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
  // HttpClient API delete() method => Delete Image
  deleteImage(bikeId: string, imageName: string): Observable<any> {
    const options = {
      ...this.httpOptions,
      body: {
        bikeId,
        imageName
      }
    };
    return this.http
      .delete<Bike>(`${this.apiURL}/images`, options)
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

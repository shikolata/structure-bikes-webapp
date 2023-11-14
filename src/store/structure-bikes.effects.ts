import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, first, map, switchMap, takeWhile} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addBike,
  addBikeFailure,
  addBikeSuccess,
  deleteBike,
  deleteBikeFailure,
  deleteBikeSuccess,
  editBike,
  editBikeFailure,
  editBikeSuccess,
  incrementBikes,
  incrementBikesFailure,
  incrementBikesSuccess,
  updateSelectedBike,
  updateSelectedBikeFailure,
  updateSelectedBikeSuccess,
  viewWeather, viewWeatherFailure,
  viewWeatherSuccess
} from "./structure-bikes.actions";
import {BikeService} from "../shared/services/bike.service";
import {Bike} from "../shared/models/bike";
import {Router} from "@angular/router";
import {StructureBikesFacade} from "./structure-bikes.facade";
import {WeatherService} from "../shared/services/weather.service";
import {Weather, WeatherResponse} from "../shared/models/weather";
import {EMPTY_WEATHER} from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class StructureBikesEffects {
    incrementBikes$ = createEffect(() => this.actions$.pipe(
    ofType(incrementBikes),
    switchMap(() => this.bikeService.getBikes().pipe(
      first(),
      map((newBikes: Bike[]) => {
        return incrementBikesSuccess({bikes: newBikes});
      }),
      catchError((error) => of(incrementBikesFailure({ error })))
    ))
  ));

  updateSelectedBike$ = createEffect(() => this.actions$.pipe(
    ofType(updateSelectedBike),
    switchMap(({  selectedBikeId }) => this.structureBikesFacade.selectedBike$.pipe(
      takeWhile(selectedBike => !selectedBike || selectedBike.id !== selectedBikeId),
      switchMap(() => {
        return this.bikeService.getBike(selectedBikeId).pipe(
          first(),
          map((bike: Bike) => {
            return updateSelectedBikeSuccess({ selectedBike: bike });
          }),
          catchError((error) => of(updateSelectedBikeFailure({ error }))));
      })
    ))
  ));

  addBike$ = createEffect(() => this.actions$.pipe(
    ofType(addBike),
    switchMap(({ bike }) => this.bikeService.createBike(bike).pipe(
      map(id => {
        this.router.navigate(['/view-bike', { id }]);
        return addBikeSuccess();
      }),
      catchError((error) => of(addBikeFailure({ error })))
    ))
  ));

  editBikes$ = createEffect(() => this.actions$.pipe(
    ofType(editBike),
    switchMap(({ bike }) => this.bikeService.updateBike(bike).pipe(
      map(() => {
        this.router.navigate(['/view-bike', { id: bike.id }]);
        return editBikeSuccess();
      }),
      catchError((error) => of(editBikeFailure({ error })))
    ))
  ));

  deleteBike$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBike),
    switchMap(({ bikeId }) => this.bikeService.deleteBike(bikeId).pipe(
      map(id => {
        return deleteBikeSuccess();
      }),
      catchError((error) => of(deleteBikeFailure({ error })))
    ))
  ));

  deleteBikeSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBikeSuccess),
    map(() => incrementBikes())
  ));

  viewWeather$ = createEffect(() => this.actions$.pipe(
    ofType(viewWeather),
    switchMap(() => this.weatherService.getWeather().pipe(
      map(weatherResponse => {
        let weather: Weather = this.generateWeather(weatherResponse);
        return viewWeatherSuccess({ weather });
      }),
      catchError((error) => of(viewWeatherFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private bikeService: BikeService,
    private weatherService: WeatherService,
    private structureBikesFacade: StructureBikesFacade,
    private router: Router
  ) {}

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
    console.log({weather});
    return weather;
  }
}

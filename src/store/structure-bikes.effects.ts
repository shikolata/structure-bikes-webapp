import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, first, map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addBike, addBikeFailure,
  addBikeSuccess,
  incrementBikes,
  incrementBikesFailure,
  incrementBikesSuccess
} from "./structure-bikes.actions";
import {BikeService} from "../shared/services/bike.service";
import {Bike} from "../shared/models/bike";
import {Router} from "@angular/router";

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

  addBike$ = createEffect(() => this.actions$.pipe(
    ofType(addBike),
    switchMap(({ bike }) => this.bikeService.createBike(bike).pipe(
      map(id => {
        this.router.navigate(['/view-candidate', { id }]);
        return addBikeSuccess();
      }),
      catchError((error) => of(addBikeFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private bikeService: BikeService,
    private router: Router
  ) {}
}

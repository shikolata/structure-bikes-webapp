import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, first, map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {incrementBikes, incrementBikesFailure, incrementBikesSuccess} from "./structure-bikes.actions";
import {BikeService} from "../shared/services/bike.service";
import {Bike} from "../shared/models/bike";

@Injectable({
  providedIn: 'root'
})
export class StructureBikesEffects {
    incrementBikes$ = createEffect(() => this.actions$.pipe(
    ofType(incrementBikes),
    switchMap(() => this.bikeService.getBikes().pipe(
      first(),
      map((newBikes: Bike[]) => {
        console.log({newBikes});
        return incrementBikesSuccess({bikes: newBikes});
      }),
      catchError((error) => of(incrementBikesFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private bikeService: BikeService
  ) {}
}

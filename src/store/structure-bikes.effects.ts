import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, first, map, switchMap, takeWhile} from 'rxjs/operators';
import { of } from 'rxjs';
import {
  addBike, addBikeFailure,
  addBikeSuccess,
  incrementBikes,
  incrementBikesFailure,
  incrementBikesSuccess, updateSelectedBike, updateSelectedBikeFailure, updateSelectedBikeSuccess
} from "./structure-bikes.actions";
import {BikeService} from "../shared/services/bike.service";
import {Bike} from "../shared/models/bike";
import {Router} from "@angular/router";
import {StructureBikesFacade} from "./structure-bikes.facade";

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
      takeWhile(selectedCandidate => !selectedCandidate || selectedCandidate.id !== selectedBikeId),
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
        this.router.navigate(['/view-candidate', { id }]);
        return addBikeSuccess();
      }),
      catchError((error) => of(addBikeFailure({ error })))
    ))
  ));

  constructor(
    private actions$: Actions,
    private bikeService: BikeService,
    private structureBikesFacade: StructureBikesFacade,
    private router: Router
  ) {}
}

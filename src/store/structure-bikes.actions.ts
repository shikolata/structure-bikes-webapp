import {createAction, props} from '@ngrx/store';
import {Page} from '../shared/constants';
import {Bike} from "../shared/models/bike";

export const setCurrentPage = createAction('[Page] Set', props<{ currentPage: Page }>());
export const setSelectedBike = createAction('[Bike] Set', props<{ selectedBike: Bike }>());
export const incrementBikes = createAction('[Bike] Increment');
export const incrementBikesSuccess = createAction('[Bike] Increment Success', props<{ bikes: Bike[] }>());
export const incrementBikesFailure = createAction('[Bike] Increment Failure', props<{ error: any }>());
export const updateSelectedBike = createAction('[Bike] Update', props<{ selectedBikeId: number }>());
export const updateSelectedBikeSuccess = createAction('[Bike] Update Success', props<{ selectedBike: Bike }>());
export const updateSelectedBikeFailure = createAction('[Bike] Update Failure', props<{ error: any }>());
export const addBike = createAction('[Bike] Add', props<{ bike: Bike }>());
export const addBikeSuccess = createAction('[Bike] Add Success');
export const addBikeFailure = createAction('[Bike] Add Failure', props<{ error: any }>());

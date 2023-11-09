import {createAction, props} from '@ngrx/store';
import {Page} from '../shared/constants';
import {Bike} from "../shared/models/bike";

export const setCurrentPage = createAction('[Page] Set', props<{ currentPage: Page }>());
export const setSelectedBike = createAction('[Bike] Set', props<{ selectedBike: Bike }>());
export const incrementBikes = createAction('[Bike] Increment');
export const incrementBikesSuccess = createAction('[Bike] Increment Success', props<{ bikes: Bike[] }>());
export const incrementBikesFailure = createAction('[Bike] Increment Failure', props<{ error: any }>());

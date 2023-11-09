import {createReducer, on} from '@ngrx/store';
import {
  incrementBikesFailure,
  incrementBikesSuccess,
  setCurrentPage,
  setSelectedBike, updateSelectedBikeFailure,
  updateSelectedBikeSuccess
} from './structure-bikes.actions';
import {EMPTY_BIKE, Page} from '../shared/constants';
import {Bike} from "../shared/models/bike";

export interface StructureBikesStoreState {
  currentPage: Page;
  bikes: Bike[];
  selectedBike: Bike;
  error: any;
}

export const initialState: StructureBikesStoreState = {
  currentPage: Page.NONE,
  bikes: [],
  selectedBike: EMPTY_BIKE,
  error: undefined
};

export const bikesReducer = createReducer(
  initialState,
  on(setCurrentPage, (state, { currentPage }) => ({...state, currentPage})),
  on(setSelectedBike, (state, { selectedBike }) => ({...state, selectedBike})),
  on(incrementBikesSuccess, (state, { bikes }) => ({...state, bikes})),
  on(incrementBikesFailure, (state, { error }) => ({...state, error})),
  on(updateSelectedBikeSuccess, (state, { selectedBike }) => ({...state, selectedBike})),
  on(updateSelectedBikeFailure, (state, { error }) => ({...state, error}))
);

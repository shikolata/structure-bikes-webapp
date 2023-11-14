import {createReducer, on} from '@ngrx/store';
import {
  editBikeSuccess,
  incrementBikesFailure,
  incrementBikesSuccess,
  setCurrentPage,
  setSelectedBike, updateSelectedBikeFailure,
  updateSelectedBikeSuccess, viewWeatherFailure, viewWeatherSuccess
} from './structure-bikes.actions';
import {EMPTY_BIKE, Page} from '../shared/constants';
import {Bike} from "../shared/models/bike";
import {Weather} from "../shared/models/weather";

export interface StructureBikesStoreState {
  currentPage: Page;
  bikes: Bike[];
  selectedBike: Bike;
  weather: Weather;
  error: any;
}

export const initialState: StructureBikesStoreState = {
  currentPage: Page.NONE,
  bikes: [],
  selectedBike: EMPTY_BIKE,
  weather: undefined,
  error: undefined
};

export const bikesReducer = createReducer(
  initialState,
  on(setCurrentPage, (state, { currentPage }) => ({...state, currentPage})),
  on(setSelectedBike, (state, { selectedBike }) => ({...state, selectedBike})),
  on(incrementBikesSuccess, (state, { bikes }) => ({...state, bikes})),
  on(incrementBikesFailure, (state, { error }) => ({...state, error})),
  on(updateSelectedBikeSuccess, (state, { selectedBike }) => ({...state, selectedBike})),
  on(updateSelectedBikeFailure, (state, { error }) => ({...state, error})),
  on(editBikeSuccess, (state) => ({...state, selectedBike: EMPTY_BIKE})),
  on(viewWeatherSuccess, (state, { weather }) => ({...state, weather})),
  on(viewWeatherFailure, (state, { error }) => ({...state, error})),
);

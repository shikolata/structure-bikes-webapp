import { createReducer, on } from '@ngrx/store';
import {
  incrementBikesFailure,
  incrementBikesSuccess,
  setCurrentPage,
  setSelectedBike
} from './structure-bikes.actions';
import {Page} from '../shared/constants';
import {Bike} from "../shared/models/bike";

export interface StructureBikesStoreState {
  currentPage: Page | undefined;
  bikes: Bike[];
  selectedBike: Bike | undefined;
  error: any;
}

export const initialState: StructureBikesStoreState = {
  currentPage: undefined,
  bikes: [],
  selectedBike: undefined,
  error: undefined
};

export const bikesReducer = createReducer(
  initialState,
  on(setCurrentPage, (state, { currentPage }) => ({...state, currentPage})),
  on(setSelectedBike, (state, { selectedBike }) => ({...state, selectedBike})),
  on(incrementBikesSuccess, (state, { bikes }) => ({...state, bikes})),
  on(incrementBikesFailure, (state, { error }) => ({...state, error}))
);

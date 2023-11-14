import {StructureBikesStoreState} from './structure-bikes.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

const featureSelector = createFeatureSelector<StructureBikesStoreState>('bikes');
export const currentPage$ = createSelector(featureSelector, (state) => state.currentPage);
export const bikes$ = createSelector(featureSelector, (state) => state.bikes);
export const selectedBike$ = createSelector(featureSelector, (state) => state.selectedBike);
export const weather$ = createSelector(featureSelector, (state) => state.weather);

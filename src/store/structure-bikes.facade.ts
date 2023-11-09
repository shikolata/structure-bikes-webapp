import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {StructureBikesStoreState} from './structure-bikes.reducer';
import * as StructureBikesSelectors from './structure-bikes.selectors';
import * as StrcutureBikesActions from './structure-bikes.actions';
import {Bike} from '../shared/models/bike';
import {Page} from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class StructureBikesFacade {
  currentPage$ = this.store.pipe(select(StructureBikesSelectors.currentPage$));
  bikes$ = this.store.pipe(select(StructureBikesSelectors.bikes$));
  selectedBike$ = this.store.pipe(select(StructureBikesSelectors.selectedBike$));

  constructor(private store: Store<StructureBikesStoreState>) {}

  setCurrentPage(currentPage: Page): void {
    this.store.dispatch(StrcutureBikesActions.setCurrentPage({currentPage}));
  }

  setSelectedCandidate(selectedBike: Bike): void {
    this.store.dispatch(StrcutureBikesActions.setSelectedBike({selectedBike}));
  }

  incrementBikes(): void {
    this.store.dispatch(StrcutureBikesActions.incrementBikes());
  }
}

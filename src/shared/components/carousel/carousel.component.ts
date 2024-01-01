import {Component, Signal, inject} from '@angular/core';
import {Bike} from "../../models/bike";
import { MatCardModule } from '@angular/material/card';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    standalone: true,
    imports: [MatCardModule]
})
export class CarouselComponent {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);

  selectedBike: Signal<Bike> = this.structureBikesStore.selectedBike;
}

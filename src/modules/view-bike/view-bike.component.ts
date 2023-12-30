import {Component, Input, OnInit, Signal, effect, inject} from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {Router} from "@angular/router";
import { BikeFormComponent } from '../../shared/components/bike-form/bike-form.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';

@Component({
    selector: 'app-view-bike',
    templateUrl: './view-bike.component.html',
    styleUrls: ['./view-bike.component.scss'],
    standalone: true,
    imports: [NavigationComponent, BikeFormComponent]
})
export class ViewBikeComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);  
  private router: Router = inject(Router);

  @Input('id') bikeId: string;
  
  viewBikeForm: BikeForm = EMPTY_BIKE_FORM;
  selectedBike: Signal<Bike> = this.structureBikesStore.selectedBike;
  page = Page;

  effect = effect(() => {
    if(this.selectedBike()?.id.toString() === this.bikeId) {
      this.setViewBikeForm(this.selectedBike());
    }
  });

  ngOnInit(): void {
    this.structureBikesStore.setCurrentPage(Page.VIEW_BIKE);
    this.structureBikesStore.updateSelectedBike(+this.bikeId);
  }

  setViewBikeForm(bike: Bike): void {
    this.viewBikeForm = {
      name: bike.name,
      year: bike.year,
      make: bike.make,
      model: bike.model,
      description: bike.description,
      rating: bike.rating,
      price: bike.price,
      quantity: bike.quantity,
      category: bike.category
    }
  }

  onSubmit(): void {
    this.router.navigate(['/edit-bike', { id: this.bikeId }]);
  }

  onEditGallery(): void {
    this.router.navigate(['/edit-gallery', { id: this.bikeId }]);
  }
}

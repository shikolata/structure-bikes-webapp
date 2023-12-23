import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {Observable, skipWhile, Subscription} from "rxjs";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {Router} from "@angular/router";
import {first, map} from "rxjs/operators";
import { BikeFormComponent } from '../../shared/components/bike-form/bike-form.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

@Component({
    selector: 'app-view-bike',
    templateUrl: './view-bike.component.html',
    styleUrls: ['./view-bike.component.scss'],
    standalone: true,
    imports: [NavigationComponent, BikeFormComponent]
})
export class ViewBikeComponent implements OnInit, OnDestroy {
  @Input('id') bikeId: string;
  viewBikeForm: BikeForm;
  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;
  page = Page;
  selectedBikeSubscription: Subscription;

  constructor(private structureBikesFacade: StructureBikesFacade,
              private router: Router) {
    this.viewBikeForm = EMPTY_BIKE_FORM;
  }

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.VIEW_BIKE);
    this.structureBikesFacade.updateSelectedBike(+this.bikeId);
    this.selectedBikeSubscription = this.selectedBike$.pipe(
      skipWhile((selectedBike: Bike) => !selectedBike || selectedBike.id.toString() !== this.bikeId),
      first(),
      map((selectedBike: Bike) => {
        this.setViewBikeForm(selectedBike);
      })
    ).subscribe();
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

  ngOnDestroy() {
    this.selectedBikeSubscription.unsubscribe();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {Observable, skipWhile, Subscription} from "rxjs";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {ActivatedRoute} from "@angular/router";
import {first, map} from "rxjs/operators";

@Component({
  selector: 'app-view-bike',
  templateUrl: './view-bike.component.html',
  styleUrls: ['./view-bike.component.scss']
})
export class ViewBikeComponent implements OnInit, OnDestroy {
  viewBikeForm: BikeForm;
  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;
  bikeId: string;
  page = Page;
  selectedBikeSubscription: Subscription;

  constructor(private structureBikesFacade: StructureBikesFacade,
              private route: ActivatedRoute,) {
    this.viewBikeForm = EMPTY_BIKE_FORM;
  }

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.VIEW_BIKE);
    this.bikeId = this.route.snapshot.paramMap.get('id') || '';
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

  ngOnDestroy() {
    this.selectedBikeSubscription.unsubscribe();
  }
}

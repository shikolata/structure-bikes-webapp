import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {Observable, skipWhile, Subscription} from "rxjs";
import {EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {ActivatedRoute, Router} from "@angular/router";
import {first, map} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-bike',
  templateUrl: './edit-bike.component.html',
  styleUrls: ['./edit-bike.component.scss']
})
export class EditBikeComponent implements OnInit, OnDestroy {
  editBikeForm: BikeForm;
  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;
  bikeId: string;
  page = Page;
  selectedBikeSubscription: Subscription;

  constructor(private structureBikesFacade: StructureBikesFacade,
              private route: ActivatedRoute,
              private router: Router) {
    this.editBikeForm = EMPTY_BIKE_FORM;
  }

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.VIEW_BIKE);
    this.bikeId = this.route.snapshot.paramMap.get('id') || '';
    this.structureBikesFacade.updateSelectedBike(+this.bikeId);
    this.selectedBikeSubscription = this.selectedBike$.pipe(
      skipWhile((selectedBike: Bike) => !selectedBike || selectedBike.id.toString() !== this.bikeId),
      first(),
      map((selectedBike: Bike) => {
        this.setEditBikeForm(selectedBike);
      })
    ).subscribe();
  }

  setEditBikeForm(bike: Bike): void {
    this.editBikeForm = {
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

  onSubmit(bikeFormGroup: FormGroup): void {
    if (bikeFormGroup.invalid) {
      console.log('form is invalid!');
      return;
    }
    const rawForm = bikeFormGroup.getRawValue();
    rawForm.id = Number(this.bikeId);
    const editedBike: Bike = rawForm as Bike;

    this.structureBikesFacade.editBike(editedBike);
  }

  onCancel(): void {
    this.router.navigate(['/view-bike', { id: this.bikeId }]);
  }

  ngOnDestroy() {
    this.selectedBikeSubscription.unsubscribe();
  }
}

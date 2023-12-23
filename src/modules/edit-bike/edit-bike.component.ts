import {Component, Input, OnDestroy, OnInit, inject} from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {Observable, skipWhile, Subscription} from "rxjs";
import {EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {Router} from "@angular/router";
import {first, map} from "rxjs/operators";
import {UntypedFormGroup} from "@angular/forms";
import { BikeFormComponent } from '../../shared/components/bike-form/bike-form.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

@Component({
    selector: 'app-edit-bike',
    templateUrl: './edit-bike.component.html',
    styleUrls: ['./edit-bike.component.scss'],
    standalone: true,
    imports: [NavigationComponent, BikeFormComponent]
})
export class EditBikeComponent implements OnInit, OnDestroy {
  private structureBikesFacade: StructureBikesFacade = inject(StructureBikesFacade)
  private router: Router = inject(Router);

  @Input('id') bikeId: string;

  editBikeForm: BikeForm = EMPTY_BIKE_FORM;
  selectedBike$: Observable<Bike> = this.structureBikesFacade.selectedBike$;
  page = Page;
  selectedBikeSubscription: Subscription;

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.EDIT_BIKE);
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

  onSubmit(bikeFormGroup: UntypedFormGroup): void {
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

import {Component, Input, OnInit, Signal, effect, inject} from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {Router} from "@angular/router";
import {UntypedFormGroup} from "@angular/forms";
import { BikeFormComponent } from '../../shared/components/bike-form/bike-form.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-edit-bike',
    templateUrl: './edit-bike.component.html',
    styleUrls: ['./edit-bike.component.scss'],
    standalone: true,
    imports: [NavigationComponent, BikeFormComponent]
})
export class EditBikeComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);  
  private router: Router = inject(Router);

  @Input('id') bikeId: string;

  editBikeForm: BikeForm = EMPTY_BIKE_FORM;
  selectedBike: Signal<Bike> = this.structureBikesStore.selectedBike;
  page = Page;

  effect = effect(() => {
    if(this.selectedBike()?.id.toString() === this.bikeId) {
      this.setEditBikeForm(this.selectedBike());
    }
  });

  ngOnInit(): void {
    this.structureBikesStore.setCurrentPage(Page.EDIT_BIKE);
    this.structureBikesStore.updateSelectedBike(+this.bikeId);
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

    this.structureBikesStore.editBike(editedBike);
  }

  onCancel(): void {
    this.router.navigate(['/view-bike', { id: this.bikeId }]);
  }
}

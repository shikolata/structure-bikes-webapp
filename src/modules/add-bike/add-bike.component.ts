import { Component, OnInit, inject } from '@angular/core';
import {Bike, BikeForm} from "../../shared/models/bike";
import {EMPTY_BIKE, EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {UntypedFormGroup} from "@angular/forms";
import { BikeFormComponent } from '../../shared/components/bike-form/bike-form.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-add-bike',
    templateUrl: './add-bike.component.html',
    styleUrls: ['./add-bike.component.scss'],
    standalone: true,
    imports: [NavigationComponent, BikeFormComponent]
})
export class AddBikeComponent implements OnInit {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);

  addBikeForm: BikeForm = EMPTY_BIKE_FORM;
  page = Page;

  ngOnInit(): void {
    this.structureBikesStore.setCurrentPage(Page.ADD_BIKE);
    this.structureBikesStore.setSelectedBike(EMPTY_BIKE);
  }

  onSubmit(bikeForm: UntypedFormGroup): void {
    if (bikeForm.invalid) {
      console.log('form is invalid!');
      return;
    }

    const rawForm = bikeForm.getRawValue();
    console.log(rawForm);
    rawForm.price = Number(rawForm.price);
    const newBike: Bike = rawForm as Bike;

    this.structureBikesStore.addBike(newBike);
  }
}

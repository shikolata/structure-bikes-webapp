import { Component, OnInit } from '@angular/core';
import {StructureBikesFacade} from "../../store/structure-bikes.facade";
import {Bike, BikeForm} from "../../shared/models/bike";
import {EMPTY_BIKE, EMPTY_BIKE_FORM, Page} from "../../shared/constants";
import {UntypedFormGroup} from "@angular/forms";
import { BikeFormComponent } from '../../shared/components/bike-form/bike-form.component';
import { NavigationComponent } from '../../shared/components/navigation/navigation.component';

@Component({
    selector: 'app-add-bike',
    templateUrl: './add-bike.component.html',
    styleUrls: ['./add-bike.component.scss'],
    standalone: true,
    imports: [NavigationComponent, BikeFormComponent]
})
export class AddBikeComponent implements OnInit {
  addBikeForm: BikeForm;
  page = Page;

  constructor(private structureBikesFacade: StructureBikesFacade) {
    this.addBikeForm = EMPTY_BIKE_FORM;
  }

  ngOnInit(): void {
    this.structureBikesFacade.setCurrentPage(Page.ADD_BIKE);
    this.structureBikesFacade.setSelectedBike(EMPTY_BIKE);
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

    this.structureBikesFacade.addBike(newBike);
  }
}

import {Component, EventEmitter, Input, OnChanges, OnInit, Output, Signal, SimpleChanges, inject} from '@angular/core';
import {BikeForm} from "../../models/bike";
import {BIKE_CATEGORIES, BIKE_MAKES, Page} from "../../constants";
import { Validators, ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import {BikeFormValidators} from "./bike-form.validators";
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule } from 'ngx-mask';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { CarouselComponent } from '../carousel/carousel.component';
import { StructureBikesStore } from 'src/store/sturucture-bikes.store';
import { SignalStoreProps } from '@ngrx/signals/src/signal-store-models';

@Component({
    selector: 'app-bike-form',
    templateUrl: './bike-form.component.html',
    styleUrls: ['./bike-form.component.scss'],
    standalone: true,
    imports: [
      CarouselComponent,
      MatCardModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatOptionModule,
      NgxMaskModule,
      MatButtonModule,
      TranslateModule
    ]
})
export class BikeFormComponent implements OnInit, OnChanges {
  private structureBikesStore: SignalStoreProps<any> = inject(StructureBikesStore);
  private formBuilder: FormBuilder = inject(FormBuilder);

  @Input()
  bikeForm: BikeForm;

  @Input()
  isFormDisabled = false;

  @Input()
  primaryButtonName: string;

  @Input()
  showSecondaryButton = false;

  @Input()
  tertiaryButtonName: string;

  @Output()
  submission = new EventEmitter();

  @Output()
  formCancel = new EventEmitter();

  @Output()
  tertiaryEvent = new EventEmitter();

  currentPage: Signal<Page> = this.structureBikesStore.currentPage;
  page = Page;
  bikeFormGroup: FormGroup;

  readonly BIKE_CATEGORIES = BIKE_CATEGORIES;
  readonly BIKE_MAKES = BIKE_MAKES;

  ngOnInit(): void {
    this.setBikeFormGroup(this.bikeForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bikeForm']) {
      this.setBikeFormGroup(changes['bikeForm'].currentValue);
    }
  }

  onSubmit(): void {
    this.submission.emit(this.bikeFormGroup);
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  onTertiaryEvent(): void {
    this.tertiaryEvent.emit();
  }

  setBikeFormGroup(bikeForm: BikeForm): void {
    this.bikeFormGroup = this.formBuilder.group({
      name: [{value: bikeForm.name, disabled: this.isFormDisabled}, Validators.required],
      year: [{value: bikeForm.year, disabled: this.isFormDisabled}, [Validators.required, BikeFormValidators.yearValidator()]],
      make: [{value: bikeForm.make, disabled: this.isFormDisabled}, Validators.required],
      model: [{value: bikeForm.model, disabled: this.isFormDisabled}, Validators.required],
      description: [{value: bikeForm.description, disabled: this.isFormDisabled}, Validators.required],
      rating: [{value: bikeForm.rating, disabled: this.isFormDisabled}, Validators.required],
      price: [{value: bikeForm.price, disabled: this.isFormDisabled}, Validators.required],
      quantity: [{value: bikeForm.quantity, disabled: this.isFormDisabled}, Validators.required],
      category: [{value: bikeForm.category, disabled: this.isFormDisabled}, Validators.required],
    })
  }
}

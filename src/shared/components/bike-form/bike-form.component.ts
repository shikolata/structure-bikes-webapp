import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BikeForm} from "../../models/bike";
import {Observable} from "rxjs";
import {BIKE_CATEGORIES, BIKE_MAKES, Page} from "../../constants";
import {StructureBikesFacade} from "../../../store/structure-bikes.facade";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BikeFormValidators} from "./bike-form.validators";

@Component({
  selector: 'app-bike-form',
  templateUrl: './bike-form.component.html',
  styleUrls: ['./bike-form.component.scss']
})
export class BikeFormComponent implements OnInit, OnChanges {
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

  currentPage$: Observable<Page> = this.structureBikesFacade.currentPage$;
  page = Page;
  bikeFormGroup: FormGroup;

  readonly BIKE_CATEGORIES = BIKE_CATEGORIES;
  readonly BIKE_MAKES = BIKE_MAKES;

  constructor(private formBuilder: FormBuilder,
              private structureBikesFacade: StructureBikesFacade) { }

  ngOnInit(): void {
    this.setBikeFormGroup(this.bikeForm);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bikeForm']) {
      this.setBikeFormGroup(changes['bikeForm'].currentValue);
    }
  }

  onSubmit(): void {
    console.log(this.bikeFormGroup)
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

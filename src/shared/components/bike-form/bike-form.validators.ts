import {AbstractControl, ValidatorFn} from "@angular/forms";

export class BikeFormValidators {
  static nonAlphabeticalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Return null if the value is empty
      }

      const nonAlphabeticalRegex = /[^A-Za-z]/; // Regular expression to match non-alphabetical characters

      if (nonAlphabeticalRegex.test(control.value)) {
        return { nonAlphabetical: true }; // Return an error if non-alphabetical characters are found
      }

      return null; // No error, value contains only alphabetical characters
    };
  }

  static yearValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const inputYear = parseInt(control.value, 10);

      const currentYear = new Date().getFullYear();
      const isValid = !isNaN(inputYear) && inputYear <= currentYear;

      return isValid ? null : { invalidYear: true };
    };
  }
}

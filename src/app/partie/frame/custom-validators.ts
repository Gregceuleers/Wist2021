import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function only2SelectedPlayerValidation(isAlone: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return !isAlone && control.value ? control.value.length !== 2 ? {'only2players': {value: control.value}} : null : null;
  };
}

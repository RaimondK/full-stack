import {FormControl, ValidationErrors} from "@angular/forms";

export class ShopValidators {
  static noWhitespaces(control: FormControl): ValidationErrors {
    if ((control.value != null) && (control.value.trim().length === 0)) {
      return { 'noWhitespaces': true };
    } else {
      return null;
    }
  }
}

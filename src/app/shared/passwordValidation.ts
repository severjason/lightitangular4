import { FormControl } from '@angular/forms';

export function passwordValidation(control: FormControl): {[key: string]: boolean} {

  const strongPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/;

  if (!control.value) {
    return {
      empty: true
    };
  } else if (control.value.length < 8) {
    return {
      minLength: true
    };
  } else if (!control.value.match(strongPassword)) {
    return {
      weak: true
    }
  } else if (control.value.match(strongPassword)) {
    return null;
  }

}

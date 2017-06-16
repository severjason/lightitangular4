import { FormControl } from '@angular/forms';

export function passwordValidation(control: FormControl): {[key: string]: boolean} {

  const mediumPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const strongPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/;

  if (!control.value) {
    return null;
  }

  if (control.value.length < 8) {
    return {
      minLength: true
    };
  } else if (!control.value.match(mediumPassword)) {
    return {
      medium: true
    }
  } else if (!control.value.match(strongPassword)) {
    return null;
  }

}

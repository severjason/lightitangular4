import { FormControl } from '@angular/forms';

export function matchOtherValidator (otherControlName: string) {

  let thisControl: FormControl;
  let otherControl: FormControl;

  return (control: FormControl): {[key: string]: boolean} => {

    if (!control.parent) {
      return null;
    }

    if (!thisControl && control.parent.get(otherControlName)) {
      thisControl = control;
      otherControl = control.parent.get(otherControlName) as FormControl;

      otherControl.valueChanges.subscribe(() => {
        thisControl.updateValueAndValidity();
      });
    }

    if (!otherControl) {
      return null;
    }

    if (otherControl.value !== thisControl.value) {
      return {
        notMatch: true
      };
    }

    return null;

  }

}

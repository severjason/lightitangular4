import {TestBed} from '@angular/core/testing';
import {passwordValidation} from './passwordValidation';
import {FormControl} from '@angular/forms';

describe('Password validation test', () => {

  let control: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [passwordValidation],
    })
  });

  it('Password should not be empty', () => {
    control = new FormControl('');
    expect(passwordValidation(control)).toEqual({empty: true});
  });

  it('Password should contain at least 8 characters', () => {
    control = new FormControl('testsd4');
    expect(passwordValidation(control)).toEqual({minLength: true});
  });

  it('Password should have at least 1 uppercase letter, 1 lowercase letter and 1 digit', () => {
    control = new FormControl('testsdwsdwdaadwasd4');
    expect(passwordValidation(control)).toEqual({weak: true});
    control = new FormControl('testsdwsdwdaadwasd4WW');
    expect(passwordValidation(control)).toBeFalsy();
  });
});

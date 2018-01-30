import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../shared/matchOtherValidator';
import {passwordValidation} from '../shared/passwordValidation';
import {IAppError} from '../interfaces/api.interface';
import {AuthService} from '../services/auth.service';

@Component({
  templateUrl: './signUp.component.html',
})

export class SignUpComponent implements OnInit {

  private title = 'SignUp page';
  public signUpForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public passwordConfirmation: AbstractControl;
  public error: IAppError = {
    status: false,
    message: '',
  };

  constructor(private titleService: Title, private fb: FormBuilder, private auth: AuthService) {
    this.signUpForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.compose([
        Validators.required,
        passwordValidation
      ])],
      'passwordConfirmation': ['', Validators.compose([
        Validators.required,
        matchOtherValidator('password')])],
    });
    this.username = this.signUpForm.controls['username'];
    this.password = this.signUpForm.controls['password'];
    this.passwordConfirmation = this.signUpForm.controls['passwordConfirmation'];
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.onChanges();
  }

  private onChanges(): void {
    this.signUpForm.valueChanges.subscribe(() => {
      this.clearError();
    });
  }

  private clearError(): void {
    this.error = {
      status: false,
      message: '',
    }
  }

  private setError(errorMessage: string): void {
    this.signUpForm.controls['password'].reset();
    this.signUpForm.controls['passwordConfirmation'].reset();
    this.error = {
      status: true,
      message: errorMessage
    }
  }

  public onSubmit(value: any): void {
    this.clearError();
    this.auth.register(value)
      .subscribe(
        response => {
          if (response.success) {
            console.log(`Ok - ${response.token}`);
          } else {
            this.setError(response.message);
          }
        },
        error => {
          this.setError(error.statusText);
        }
      )
  }

}

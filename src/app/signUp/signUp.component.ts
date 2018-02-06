import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../shared/matchOtherValidator';
import {passwordValidation} from '../shared/passwordValidation';
import {IAppError} from '../interfaces/api.interface';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  templateUrl: './signUp.component.html',
})

export class SignUpComponent implements OnInit {

  private _title = 'SignUp page';
  private _signedUp: boolean;
  public signUpForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public passwordConfirmation: AbstractControl;
  public error: IAppError = {
    status: false,
    message: '',
  };

  constructor(private titleService: Title,
              private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
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
    this._signedUp = false;
  }

  ngOnInit() {
    this.titleService.setTitle(this._title);
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

  public get signedUp(): boolean {
    return this._signedUp;
  }

  public set signedUp(value: boolean) {
    this._signedUp = value;
  }

  public getUsername(): string | boolean {
    return this.auth.getUserName();
  }

  public onSubmit(value: any): void {
    this.clearError();
    this.auth.register(value)
      .subscribe(
        response => {
          if (response.success) {
            this.auth.save(this.username.value.toString(), response.token);
            if (this.auth.loggedIn()) {
              this.signedUp = true;
              setTimeout(() => {
                this.router.navigate(['/']);
                this.signedUp = false;
              }, 3000);
            }
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

import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAppError} from '../interfaces/api.interface';
import {AuthService} from '../services/auth.service';

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  private title = 'Login page';
  public loginForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public error: IAppError = {
    status: false,
    message: '',
  };

  constructor(private titleService: Title,
              private fb: FormBuilder,
              private auth: AuthService) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }


  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.onChanges();
  }

  private onChanges(): void {
    this.loginForm.valueChanges.subscribe(() => {
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
    this.loginForm.controls['password'].reset();
    this.error = {
      status: true,
      message: errorMessage
    }
  }

  public onSubmit(value: any): void {

    this.clearError();

    this.auth.login(value)
      .subscribe(
        (response: any) => {
          if (response.success) {
            console.log(`Ok - ${this.username.value.toString() + '___' + response.token}`);
            this.auth.save(this.username.value.toString(), response.token);
          } else {
            this.setError(response.message);
          }
        },
        (error: any) => {
          this.setError(error.statusText);
        }
      )
  }
}

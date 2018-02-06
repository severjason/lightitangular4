import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IAppError} from '../interfaces/api.interface';
import {AuthService} from '../services/auth.service';
import {Location} from '@angular/common';

@Component({
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  private _title = 'Login page';
  public loginForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public error: IAppError = {
    status: false,
    message: '',
  };

  constructor(private _titleService: Title,
              private _fb: FormBuilder,
              private _auth: AuthService,
              private _loc: Location) {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  private get titleService(): Title {
    return this._titleService;
  }

  private get title(): string {
    return this._title;
  }

  private get fb(): FormBuilder {
    return this._fb;
  }

  private get auth(): AuthService {
    return this._auth;
  }

  private get loc(): Location {
    return this._loc;
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
            this.auth.save(this.username.value.toString(), response.token);
            this.loc.back();
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

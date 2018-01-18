import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchOtherValidator} from '../shared/matchOtherValidator';
import {passwordValidation} from '../shared/passwordValidation';
import {ApiService} from '../api/api.service';

@Component({
  templateUrl: './signUp.component.html',
})
export class SignUpComponent implements OnInit {

  private title = 'SignUp page';
  public signUpForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public passwordConfirmation: AbstractControl;

  constructor(private titleService: Title, private fb: FormBuilder, private apiService: ApiService) {
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
  }

  public onSubmit(value: any): void {
    this.apiService.register(value)
      .subscribe(
        res => {
          console.log(res);
        },
        error => {
          console.log(error);
        }
      )
  }

}

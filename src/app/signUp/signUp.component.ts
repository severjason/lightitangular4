import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from '../shared/matchOtherValidator';

@Component({
  templateUrl: './signUp.component.html',
})
export class SignUpComponent implements OnInit {

  private title = 'SignUp page';
  public signUpForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public passwordConfirmation: AbstractControl;



  constructor(private titleService: Title, private fb: FormBuilder) {
    this.signUpForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
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
    console.log('Your submitted value: ', value);
  }

}

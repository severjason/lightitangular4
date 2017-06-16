import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  private title = 'Login page';
  public loginForm: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;

  constructor(private titleService: Title, private fb: FormBuilder) {
    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });

    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  public onSubmit(value: any): void {
    console.log('Your submitted value: ', value);
  }
}

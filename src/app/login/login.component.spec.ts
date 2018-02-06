import {LoginComponent} from './login.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {async} from 'q';
import {By, Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {HttpModule} from '@angular/http';
import {AuthService} from '../services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AppCookieService} from '../services/cookie.service';
import {Location} from '@angular/common';
import {RouterTestingModule} from '@angular/router/testing';

describe('Login Form Component', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let el, de, passwordInput, usernameInput, submitButton, form;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule,
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        Title,
        ApiService,
        Location,
        AuthService,
        CookieService,
        AppCookieService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;

  }));

  it('shows error message on empty username', fakeAsync(() => {
    usernameInput = de.query(By.css('#username')).nativeElement;
    form = de.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Please enter your name');
  }));

  it('no messages if correct username', fakeAsync(() => {
    usernameInput = de.query(By.css('#username')).nativeElement;
    form = de.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    usernameInput.value = 'test';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('shows error message on empty password', fakeAsync(() => {
    passwordInput = de.query(By.css('#password')).nativeElement;
    form = de.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Password shouldn`t be empty');
  }));

  it('no messages if correct password', fakeAsync(() => {
    passwordInput = de.query(By.css('#password')).nativeElement;
    form = de.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = 'test';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('submit button active only when username and password correct', fakeAsync(() => {
    usernameInput = de.query(By.css('#username')).nativeElement;
    passwordInput = de.query(By.css('#password')).nativeElement;
    submitButton = de.query(By.css('button')).nativeElement;
    form = de.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    usernameInput.value = '';
    passwordInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
    usernameInput.value = 'test';
    passwordInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
    usernameInput.value = '';
    passwordInput.value = 'test';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
    usernameInput.value = 'username';
    passwordInput.value = 'test';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  }));
});

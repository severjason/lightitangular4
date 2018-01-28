import {LoginComponent} from './login.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {async} from 'q';
import {By, Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {HttpModule} from '@angular/http';

describe('Login Form Component', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let el, passwordInput, usernameInput, submitButton, form;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
      ],
      declarations: [
        LoginComponent
      ],
      providers: [
        Title,
        ApiService,
      ],
    }).compileComponents();
  }));

  it('shows error message on empty username', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    usernameInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Please enter your name');
  }));

  it('no messages if correct username', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    usernameInput.value = 'test';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('shows error message on empty password', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = '';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Password shouldn`t be empty');
  }));

  it('no messages if correct password', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = 'test';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('submit button active only when username and password correct', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
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


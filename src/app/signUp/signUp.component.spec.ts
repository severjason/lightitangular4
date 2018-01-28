import {SignUpComponent} from './signUp.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {async} from 'q';
import {By, Title} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiService} from '../services/api.service';
import {HttpModule} from '@angular/http';

describe('SignUp Form Component', () => {

  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let el, confirmPasswordInput, passwordInput, usernameInput, submitButton, form;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
      ],
      declarations: [
        SignUpComponent
      ],
      providers: [
        Title,
        ApiService,
      ],
    }).compileComponents();
  }));

  it('shows error message on empty username', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
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
    fixture = TestBed.createComponent(SignUpComponent);
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
    fixture = TestBed.createComponent(SignUpComponent);
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

  it('shows error if password less then 8 characters', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
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
    expect(msgs[0].innerHTML).toContain('Password should contain at least 8 characters');
  }));

  it('shows error if weak password', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = 'test1234';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Password should have at least 1 uppercase letter, 1 lowercase letter and 1 digit');
  }));

  it('shows no error if password has more then 8 characters ' +
    'and contains 1 uppercase character, 1 lowercase characters and 1 digit',
    fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = 'test1234W';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('shows error message on empty password confirmation', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    confirmPasswordInput = fixture.debugElement.query(By.css('#passwordConfirmation')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    confirmPasswordInput.value = '';
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Passwords didn`t match!');
  }));

  it('shows error message when confirmation password wrong', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    confirmPasswordInput = fixture.debugElement.query(By.css('#passwordConfirmation')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    passwordInput.value = '12345678wW';
    confirmPasswordInput.value = '12345678wW';
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('submit button active only when all fields are correct', fakeAsync(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    usernameInput = fixture.debugElement.query(By.css('#username')).nativeElement;
    passwordInput = fixture.debugElement.query(By.css('#password')).nativeElement;
    confirmPasswordInput = fixture.debugElement.query(By.css('#passwordConfirmation')).nativeElement;
    submitButton = fixture.debugElement.query(By.css('button')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    usernameInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
    usernameInput.value = 'username';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
    usernameInput.value = 'username';
    passwordInput.value = 'password';
    confirmPasswordInput.value = 'password';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeTruthy();
    usernameInput.value = 'username';
    passwordInput.value = 'password1234W';
    confirmPasswordInput.value = 'password1234W';
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    confirmPasswordInput.dispatchEvent(new Event('input'));
    tick();
    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalsy();
  }));

});

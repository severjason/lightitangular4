import {LoginComponent} from './login.component';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {async} from 'q';
import { By } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('Login Form Component', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let el, input, form;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        LoginComponent
      ]
    }).compileComponents();
  }));

  it('shows error message on empty username', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('#username')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Please enter your name');
  }));

  it('no messages if correct username', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('#username')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

  it('shows error message on empty password', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('#password')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    input.value = '';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs[0].innerHTML).toContain('Password shouldn`t be empty');
  }));

  it('no messages if correct password', fakeAsync(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement.nativeElement;
    input = fixture.debugElement.query(By.css('#password')).nativeElement;
    form = fixture.debugElement.query(By.css('form')).nativeElement;
    fixture.detectChanges();
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick();
    const msgs = el.querySelectorAll('div.form-control-feedback');
    expect(msgs.length).toEqual(0);
  }));

});


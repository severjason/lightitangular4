import {TestBed, async, fakeAsync} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {BrowserModule, Title} from '@angular/platform-browser';
import {ApiService} from './services/api.service';
import {AuthGuardService} from './services/authguard.service';
import {HomeComponent} from './home/home.component';
import {SignUpComponent} from './signUp/signUp.component';
import {LoginComponent} from './login/login.component';
import {ProductComponent} from './product/product.component';
import {OrderByPipe} from './product/orderby.pipe';
import {AuthService} from './services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AppCookieService} from './services/cookie.service';
import {RateClassPipe} from './product/product-rate.pipe';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {NavComponent} from './nav/nav.component';
import {ProductResolver} from './product/products.resolver';
import {RouterTestingModule} from '@angular/router/testing';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        ProductComponent,
        SignUpComponent,
        LoginComponent,
        RateClassPipe,
        OrderByPipe,
      ],
      imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule,
      ],
      providers: [
        Title,
        ApiService,
        ProductResolver,
        AuthService,
        CookieService,
        AppCookieService,
        AuthGuardService,
      ],
    }).compileComponents();
  }));

  it('Should create the app', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

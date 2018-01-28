import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signUp/signUp.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiService} from './services/api.service';
import {HttpModule} from '@angular/http';
import {ProductComponent} from './product/product.component';
import {ProductResolver} from './product/products.resolver';
import {RateClassPipe} from './product/product-rate.pipe';
import {AppCookieService} from './services/cookie.service';
import {CookieService} from 'ngx-cookie-service';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-products',
    pathMatch: 'full'
  },
  {
    path: 'all-products',
    component: HomeComponent,
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    resolve: {products: ProductResolver},
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'all-products',
    pathMatch: 'full'
  },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    SignUpComponent,
    LoginComponent,
    RateClassPipe,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RateClassPipe,
  ],
  providers: [
    Title,
    ApiService,
    ProductResolver,
    AppCookieService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

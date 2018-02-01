import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signUp/signUp.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiService} from './services/api.service';
import {HttpModule} from '@angular/http';
import {ProductComponent} from './product/product.component';
import {ProductResolver} from './product/products.resolver';
import {RateClassPipe} from './product/product-rate.pipe';
import {AuthService} from './services/auth.service';
import {CookieService} from 'ngx-cookie-service';
import {AuthGuardService} from './services/authguard.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from './interceptors/token.interceptor';


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
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuardService],
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
    NavComponent,
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
    AuthService,
    CookieService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

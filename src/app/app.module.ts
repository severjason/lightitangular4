import {BrowserModule, Title} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './signUp/signUp.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiService} from './api/api.service';
import {HttpModule} from '@angular/http';
import {ProductComponent} from './product/product.component';

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
    data: [{title: ''}],
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
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    Title,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(private titleService: Title) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle)
  }
}

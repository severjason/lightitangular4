import {Injectable, SecurityContext} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {IProduct} from './api.interface'
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class ApiService {

  private _apiUrl = 'http://smktesting.herokuapp.com/api/';
  private _productsUrl = 'products/';
  private _registerUrl = 'register/';
  private _loginUrl = 'login/';
  private _reviewsUrl = 'reviews/';

  static handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  constructor(private http: Http, private sanitizer: DomSanitizer) {
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http
      .get(this._apiUrl + this._productsUrl)
      .map((response: Response) => {
        return <IProduct[]>response.json();
      })
      .catch(ApiService.handleError);
  }

  public register(newUser: any): Observable<any> {
    return this.http.post(this._apiUrl + this._registerUrl, {
        username: this.sanitizer.sanitize(SecurityContext.HTML, newUser.username),
        password: newUser.password,
      })
  }

  public login(user: any): Observable<any> {
    return this.http.post(this._apiUrl + this._loginUrl, {
      username: this.sanitizer.sanitize(SecurityContext.HTML, user.username),
      password: user.password,
    })
  }

  public getReviews(productId: number): Observable<any> {
    return this.http.get(this._apiUrl + this._reviewsUrl + `${productId}`)
      .map((response: Response) => {
        return response.json();
      })
      .catch(ApiService.handleError);
  }

}

import {Injectable, SecurityContext} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {IAppProduct} from '../interfaces/api.interface'
import {DomSanitizer} from '@angular/platform-browser';
import {AppCookieService} from './cookie.service';

@Injectable()
export class ApiService {

  private _apiUrl = 'http://smktesting.herokuapp.com/api/';
  private _productsUrl = 'products/';
  private _registerUrl = 'register/';
  private _loginUrl = 'login/';
  private _reviewsUrl = 'reviews/';

  static handleError(error: Response) {
    console.log(error.statusText || `Can't join the server.`);
    return Observable.throw(error.statusText);
  }

  constructor(private _http: Http, private _sanitizer: DomSanitizer, private appCookieService: AppCookieService) {
  }

  public get loginUrl(): string {
    return this._loginUrl;
  }

  public get registerUrl(): string {
    return this._registerUrl;
  }

  public get apiUrl(): string {
    return this._apiUrl;
  }

  public get reviewsUrl(): string {
    return this._reviewsUrl;
  }

  public get productsUrl(): string {
    return this._productsUrl;
  }

  public get http(): Http {
    return this._http;
  }

  public get sanitizer(): DomSanitizer {
    return this._sanitizer;
  }

  public get cs(): AppCookieService {
    return this.appCookieService;
  }

  public getProducts(): Observable<IAppProduct[]> {
    return this.http
      .get(this.apiUrl + this.productsUrl)
      .map((res: Response) => <IAppProduct[]>res.json())
      .catch(ApiService.handleError);
  }

  public getReviews(productId: number): Observable<any> {
    return this.http.get(this.apiUrl + this.reviewsUrl + `${productId}`)
      .map((res: Response) => res.json())
      .catch(ApiService.handleError);
  }

  public sendReview(reviewText: string, reviewRate: number, productId: number): Observable<any> {
    return this.http.post(this.apiUrl + this.reviewsUrl + `${productId}`, {
      rate: reviewRate,
      text: this.sanitizer.sanitize(SecurityContext.HTML, reviewText),
    }, this.cs.getTokenHeaders())
      .map((res: Response) => res.json())
      .catch(ApiService.handleError);
  }

}

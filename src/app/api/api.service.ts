import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {IProduct} from './api.interface'

@Injectable()
export class ApiService {

  private _apiUrl = 'http://smktesting.herokuapp.com/api/';
  private _productsUrl = 'products/';

  static handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  constructor(private http: Http) {
  }

  public getProducts(): Observable<IProduct[]> {
    return this.http
      .get(this._apiUrl + this._productsUrl)
      .map((response: Response) => {
        return <IProduct[]>response.json();
      })
      .catch(ApiService.handleError);
  }

}

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {IProducts} from './api.interface'

@Injectable()
export class ApiService {

  private _apiUrl = 'http://smktesting.herokuapp.com/api/';
  private _productsUrl = 'products/';

  constructor(private http: Http) {
  }

  public getProducts(): Observable<IProducts[]> {
    return this.http
      .get(this._apiUrl + this._productsUrl)
      .map((response: Response) => {
        return <IProducts[]>response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}

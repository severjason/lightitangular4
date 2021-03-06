import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs/Observable';
import {IAppProduct} from '../interfaces/api.interface';

@Injectable()
export class ProductResolver implements Resolve<Observable<IAppProduct[]>> {

  constructor(private apiService: ApiService) {}

  private get api(): ApiService {
    return this.apiService;
  }

  resolve() {
    return this.api.getProducts().catch(() => {
      return Observable.of('data not available at this time');
      // return Observable.empty();
    });
  }
}

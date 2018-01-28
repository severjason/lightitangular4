import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ApiService} from '../services/api.service';
import {IAppProduct} from '../interfaces/api.interface';

@Component({
  templateUrl: './home.component.html',
  providers: [ApiService],
})
export class HomeComponent implements OnInit {

  private _title = 'All products';
  public products: IAppProduct[];
  public error: string;

  constructor(private titleService: Title, private apiService: ApiService) {}

  ngOnInit() {
    this.titleService.setTitle(this._title);
    this.getProducts();
  }

  public getProducts(): IAppProduct[] | void {
    this.apiService.getProducts()
      .subscribe(
        res => {
          this.products = res;
        },
        error => {
          this.error = error;
        }
      )
  }


}

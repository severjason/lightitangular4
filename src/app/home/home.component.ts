import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ApiService} from '../api/api.service';
import {IProducts} from '../api/api.interface';

@Component({
  templateUrl: './home.component.html',
  providers: [ApiService],
})
export class HomeComponent implements OnInit {

  private _title = 'All products';
  public products: IProducts[];
  public error: string;

  constructor(private titleService: Title, private apiService: ApiService) {}

  ngOnInit() {
    this.titleService.setTitle(this._title);
    this.getProducts();
  }

  public getProducts(): IProducts[] | void {
    this.apiService.getProducts()
      .subscribe(
        res => {
          this.products = res;
          console.log(this.products);
        },
        error => {
          this.error = error;
          console.log('Error :: ' + error)
        }
      )
  }


}

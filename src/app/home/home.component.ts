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

  constructor(private _titleService: Title, private apiService: ApiService) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getProducts();
  }

  private get titleService(): Title {
    return this._titleService;
  }

  private get title(): string {
    return this._title;
  }

  private get api(): ApiService {
    return this.apiService;
  }

  public getProducts(): IAppProduct[] | void {
    this.api.getProducts()
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

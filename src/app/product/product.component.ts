import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api/api.service';
import {IProduct} from '../api/api.interface';

@Component({
  templateUrl: './product.component.html',
  providers: [ApiService]
})

export class ProductComponent implements OnInit {

  private _pageTitle = 'Product | ';
  private _id = 0;
  private _products: IProduct[];
  public product: any;

  constructor(
    private titleService: Title,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
    this._id = +this.route.snapshot.paramMap.get('id') - 1;
    this._products = this.route.snapshot.data.products;
  }

  ngOnInit() {
    this.titleService.setTitle(this._pageTitle + this._id);
    if (!this._products[this._id]) {
      this.router.navigate(['all-products']);
    }
    this.product = this._products[this._id];
    console.log(this.product);
  }
}

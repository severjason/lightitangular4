import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ApiService} from '../api/api.service';

@Component({
  templateUrl: './product.component.html',
  providers: [ApiService]
})

export class ProductComponent implements OnInit {

  private _title = 'All products';

  constructor(private titleService: Title, private apiService: ApiService) {}

  ngOnInit() {
    this.titleService.setTitle(this._title);
  }
}

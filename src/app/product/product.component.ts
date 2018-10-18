import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../services/api.service';
import {IAppProduct, IAppReview} from '../interfaces/api.interface';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  templateUrl: './product.component.html',
  providers: [ApiService],
})

export class ProductComponent implements OnInit {

  private _title: string;
  private _id: number;
  private _products: IAppProduct[];
  private _rating: number;

  public reviewForm: FormGroup;
  public reviewText: AbstractControl;
  public product: IAppProduct;
  public reviews: IAppReview[];
  public staticUrl: string;
  public error: any;

  constructor(private _titleService: Title,
              private _api: ApiService,
              private _auth: AuthService,
              private _fb: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router) {
    this._id = +this.route.snapshot.paramMap.get('id');
    this._title = 'Product | ';
    this._products = this.route.snapshot.data.products;
    this.reviewForm = this.fb.group({
      'reviewText': ['', Validators.required],
    });
    this.reviewText = this.reviewForm.controls['reviewText'];
    this._rating = 0;
  }

  private get titleService(): Title {
    return this._titleService;
  }

  private get api(): ApiService {
    return this._api;
  }

  private get fb(): FormBuilder {
    return this._fb;
  }

  private get auth(): AuthService {
    return this._auth;
  }

  private get route(): ActivatedRoute {
    return this._route;
  }

  private get router(): Router {
    return this._router;
  }

  private get id(): number {
    return this._id;
  }

  private get title(): string {
    return this._title;
  }

  private get products(): IAppProduct[] {
    return this._products;
  }

  private get rating(): number {
    return this._rating;
  }

  private set rating(value: number) {
    if (value >= 0 && value <= 5) {
      this._rating = value;
    }
  }

  ngOnInit() {
    this.titleService.setTitle(this.title + this.id);
    if (!this.products[this.id - 1]) {
      this.router.navigate(['/']);
    }
    this.product = this.products[this.id - 1];
    this.staticUrl = `${this.api.mainUrl}/static/`;
    this.getReviews();
  }

  private getReviews(): void {
    this.api.getReviews(this.id)
      .subscribe(
        res => {
          this.reviews = res;
        },
        error => {
          this.error = error;
        }
      )
  }

  public userLoggedIn(): boolean {
    return this.auth.loggedIn();
  }

  public setRating(value: number): void {
    this.rating = value;
  }

  public onSubmit(value: any): void {
    this.api.sendReview(value.reviewText, this.rating, this.id)
      .subscribe(
        res => {
          if (res.success) {
            this.reviewForm.controls['reviewText'].reset();
            this.getReviews();
          } else {
            console.log(res);
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}

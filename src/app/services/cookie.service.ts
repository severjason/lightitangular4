import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AppCookieService {
  constructor (private cookieService: CookieService) {

  }
}

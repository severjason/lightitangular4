import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AppCookieService {

  private username: string;
  private token: string;

  constructor (private cookieService: CookieService) {
    this.username = 'username';
    this.token = 'token';
  }

  public save(username: string, token: string): void {
    this.cookieService.set(this.username, username);
    this.cookieService.set(this.token, token);
  }

  public delete(): void {
    this.cookieService.deleteAll();
  }

  public getUserName(): string | boolean {
    return (this.cookieService.get(this.username)) ? this.cookieService.get(this.username) : false;
  }

  public getToken(): string | boolean {
    return (this.cookieService.get(this.token)) ? this.cookieService.get(this.token) : false;
  }
}

import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AppCookieService {

  private _usernameCookie: string;
  private _tokenCookie: string;

  constructor(private cookieService: CookieService) {
    this._usernameCookie = 'username';
    this._tokenCookie = 'token';
  }

  private get cs(): CookieService {
    return this.cookieService;
  }

  private get usernameCookie(): string {
    return this._usernameCookie;
  }

  private get tokenCookie(): string {
    return this._tokenCookie;
  }

  public saveUsername(username: string): void {
    this.cs.set(this.usernameCookie, username);
  }

  public saveToken(token: string): void {
    this.cs.set(this.tokenCookie, token);
  }

  public delete(): void {
    this.cs.delete(this.usernameCookie);
    this.cs.delete(this.tokenCookie);
    this.cs.deleteAll();
  }

  public getUserName(): string | boolean {
    return (this.cs.get(this.usernameCookie)) ? this.cs.get(this.usernameCookie) : false;
  }

  public getTokenHeaders(): RequestOptions {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Token ${this.getToken()}`);
    return new RequestOptions({headers: headers});
  }

  public getToken(): string | boolean {
    return (this.cs.get(this.tokenCookie)) ? this.cs.get(this.tokenCookie) : false;
  }

}

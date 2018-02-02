import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Headers, RequestOptions} from '@angular/http';

@Injectable()
export class AppCookieService {

  private usernameCookie: string;
  private tokenCookie: string;

  constructor(private cs: CookieService) {
    this.usernameCookie = 'username';
    this.tokenCookie = 'token';
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

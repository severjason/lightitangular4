import {Injectable, SecurityContext} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ApiService} from './api.service';
import {Http, Response} from '@angular/http';
import {IUser} from '../interfaces/api.interface';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  private usernameCookie: string;
  private tokenCookie: string;

  constructor(private cs: CookieService,
              private api: ApiService,
              private http: Http,
              private sanitizer: DomSanitizer,
              private router: Router) {
    this.usernameCookie = 'username';
    this.tokenCookie = 'token';
  }

  public save(username: string, token: string): void {
    this.cs.set(this.usernameCookie, username);
    this.cs.set(this.tokenCookie, token);
  }

  private delete(): void {
    this.cs.delete(this.usernameCookie);
    this.cs.delete(this.tokenCookie);
  }

  public getUserName(): string | boolean {
    return (this.cs.get(this.usernameCookie)) ? this.cs.get(this.usernameCookie) : false;
  }

  public getToken(): string | boolean {
    return (this.cs.get(this.tokenCookie)) ? this.cs.get(this.tokenCookie) : false;
  }

  public login(user: IUser) {
    return this.http.post(this.api.apiUrl + this.api.loginUrl, {
      username: this.sanitizer.sanitize(SecurityContext.HTML, user.username),
      password: user.password,
    }).map((res: Response) => res.json())
      .catch(ApiService.handleError);
  }

  public register(newUser: any): Observable<any> {
    return this.http.post(this.api.apiUrl + this.api.registerUrl, {
      username: this.sanitizer.sanitize(SecurityContext.HTML, newUser.username),
      password: newUser.password,
    }).map((res: Response) => res.json())
      .catch(ApiService.handleError);
  }

  public logout(): void {
    this.router.navigate(['/login']);
    this.delete();
  }

  public loggedIn(): boolean {
    return !!(this.getToken() && this.getUserName());
  }
}

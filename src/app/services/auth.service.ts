import {Injectable, SecurityContext} from '@angular/core';
import {ApiService} from './api.service';
import {Http, Response} from '@angular/http';
import {IUser} from '../interfaces/api.interface';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AppCookieService} from './cookie.service';

@Injectable()
export class AuthService {

  constructor(private cs: AppCookieService,
              private api: ApiService,
              private http: Http,
              private sanitizer: DomSanitizer,
              private router: Router) {
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

  public save(username: string, token: string): void {
    this.cs.saveUsername(this.sanitizer.sanitize(SecurityContext.HTML, username));
    this.cs.saveToken(token);
  }

  public getUserName(): string | boolean {
    return this.cs.getUserName();
  }

  public logout(): void {
    this.cs.delete();
    this.router.navigate(['/']);
  }

  public loggedIn(): boolean {
    return !!(this.cs.getToken() && this.cs.getUserName());
  }
}

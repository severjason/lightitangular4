import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthService, private _router: Router) {
  }

  private get auth(): AuthService {
    return this._auth;
  }

  private get router(): Router {
    return this._router;
  }

  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}

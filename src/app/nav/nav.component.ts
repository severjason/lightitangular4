import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})

export class NavComponent implements OnInit {

  constructor(private _auth: AuthService) {
  }

  private get auth(): AuthService {
    return this._auth;
  }

  ngOnInit() {
    this.loggedIn()
  }

  public onLogout(): void {
    console.log('Logout from nav component');
    this.auth.logout();
  }

  public loggedIn(): boolean {
    return this.auth.loggedIn();
  }

  public getUsername(): string | boolean {
    return this.auth.getUserName();
  }
}

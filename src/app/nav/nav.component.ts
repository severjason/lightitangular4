import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})

export class NavComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit() {
    this.loggedIn()
  }

  public onLogout(): void {
    this.auth.logout();
  }

  public loggedIn(): boolean {
    return this.auth.loggedIn();
  }

  public getUsername(): string | boolean {
    return this.auth.getUserName();
  }
}

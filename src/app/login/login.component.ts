import {Component, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  private title = 'Login page';

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }
}

import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  logInTabSelected(): boolean {
    return this.router.url.includes('/log-in');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

}
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(
    private router: Router,
    public authService: AuthService
  ) {
  }

  homeTabSelected(): boolean {
    return this.router.url.includes('/home');
  }

  bookingsTabSelected(): boolean {
    return this.router.url.includes('/bookings');
  }

}

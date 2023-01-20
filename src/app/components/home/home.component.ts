import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private userName = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.userName = this.authService.parseJwt(token).sub;
    }
  }

  getWelcomeMessage(): string {
    return this.userName
      ? `Welcome to "Catherine" hotel, ${this.userName}!`
      : 'Welcome to "Catherine" hotel!';
  }
}

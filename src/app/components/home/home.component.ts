import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private userName = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
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

  toApply(): void {
    this.router.navigate(['/create-apply'],
      { relativeTo: this.activatedRoute }).then(r => '');
  }



}

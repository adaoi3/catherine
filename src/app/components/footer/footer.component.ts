import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  toHome(): void {
    this.router.navigate(['/home'], { relativeTo: this.activatedRoute }).then(r => '');
  }

}

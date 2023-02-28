import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request)
    .pipe(
      tap({
        error: (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            localStorage.removeItem('token');
            this.router.navigateByUrl('/log-in').then(r => '');
          }
        }
      })
    );
  }
}

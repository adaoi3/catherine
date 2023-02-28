import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class AddTokenHeaderInterceptor implements HttpInterceptor {

  constructor(
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string;
    let token = localStorage.getItem('token');
    if (token) {
      const clonedRequest = req.clone(
        { headers: req.headers.append('Authorization', `Bearer ${token}`) }
      );
      return next.handle(clonedRequest)
      .pipe(
        tap({
          // error: (error) => {
          //   if (error instanceof HttpResponse && error.status === 401){
          //     localStorage.removeItem('token')
          //     this.router.navigateByUrl('/log-in').then(r => {});
          //   }
          // }

          // next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          // error: (error) => (ok = 'failed')

          error: (error) => {
            console.log('xxx')
            if (error instanceof HttpErrorResponse) {
              console.log(error.status);
            }
          }
        })
      );
    }
    return next.handle(req);
  }

}

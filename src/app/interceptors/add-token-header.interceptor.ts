import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddTokenHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');
    if (token) {
      const clonedRequest = req.clone(
        { headers: req.headers.append('Authorization', `Bearer ${token}`) }
      );
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }

}

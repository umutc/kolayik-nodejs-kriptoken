import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.headers.has(InterceptorSkipHeader)) {
      const headers = request.headers.delete(InterceptorSkipHeader);
      return next.handle(request.clone({ headers }));
    }

    return next.handle(request.clone({
      setHeaders: {
        // 'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${this.auth.getToken()}`
      }
    })).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse && evt.body && evt.body.code === 401) {
          console.log('401 HTTP_UNAUTHORIZED: Oturumunuzun süresi doldu. Tekrar giriş yapınız');
        }
      })
    );
  }

}

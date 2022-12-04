import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const updatedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getAccessToken().token}`,
      },
    });
    return next.handle(updatedRequest).pipe(
      catchError((err, _caught) => {
        if (err.status === 401) {
          // CONSERTAR ISSO AQUI !!!!!!!!!!!!!!
        }else if(err.status === 403){
          this.router.navigate([""]);
        }
        return throwError(() => err);
      })
    );
  }
}

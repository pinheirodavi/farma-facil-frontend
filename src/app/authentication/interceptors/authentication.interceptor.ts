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
  ) { }

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
      catchError((err: any) => this.handleUnauthorized(err))
    );
  }

  private handleUnauthorized = (err: any) => {
    if (err.status === 401) {
      return this.authService.refreshToken(this.authService.getRefreshToken().token)
        .then(data => {
          console.log(data)
          return data;
        })
        .then(tokens => {
          console.log(tokens);
          return this.authService.token = tokens;
        })
        .catch(err => {
          this.router.navigate(['/login']);
          this.authService.destroyToken();
          return throwError(err);
        });
    }
    if (err.status === 403) {
      console.log('Forbidden');
      this.router.navigate([''])
      return throwError((err: any) => 'Sem permissão' + err);
    }
    return throwError(err);
  }

}

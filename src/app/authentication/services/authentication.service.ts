import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap, firstValueFrom } from 'rxjs';
import { IToken } from '../interfaces/Token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) { }

  get token() {
    return localStorage.getItem('authTokens');
  }

  set token(token) {
    localStorage.setItem('authTokens', JSON.stringify(token));
  }

  async isAuthenticated() {
    if (this.token) {
      const { accessToken, refreshToken } = JSON.parse(this.token!);
      if (this.isTokenValid(accessToken)) {
        return true;
      }
      if (this.isTokenValid(refreshToken)) {
        const refreshTokens = await this.refreshToken(refreshToken);

        return refreshTokens ? true : false;
      }
      return false;
    }
    return !!this.token;
  }

  userRole: any;

  authenticate(loginInfo: { login: string; password: string }) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, loginInfo)
      .pipe(
        take(1),
        tap((response) => {
          localStorage.setItem("username", response.user.name);
          this.token = response.authTokens;
        })
      );
  }

  isTokenValid(token: any) {
    const expiration = new Date(token.expires);
    return expiration > new Date();
  }

  refreshToken(refreshToken: any) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/refresh-tokens`, {
        refreshToken: refreshToken.token,
      })
      .pipe(
        take(1),
        tap((response) => {
          this.token = response;
        })
      )
      .toPromise();
  }

  async logout() {
    const { refreshToken } = JSON.parse(this.token!);
    console.log(refreshToken.token);
    return await firstValueFrom(
      this.http.post<any>(`${environment.apiUrl}/auth/logout`, {
        refreshToken: refreshToken.token,
      })
    )
      .then((data) => {
        this.destroyToken();
        this.router.navigate(['/login']);
        return data;
      })
      .catch((error) => {
        console.log('ERROR!' + error.message);
        return false;
      });
  }

  destroyToken() {
    localStorage.removeItem('authTokens');
  }

  getAccessToken() {
    if (this.token) {
      const { accessToken } = JSON.parse(this.token);
      return accessToken;
    }

    return '';
  }

  getRefreshToken() {
    if (this.token) {
      const { refreshToken } = JSON.parse(this.token);
      return refreshToken;
    }

    return '';
  }
}

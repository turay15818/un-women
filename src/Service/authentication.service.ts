import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { apiUrl } from 'src/variable';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    console.log('Sending login request to backend...');
    return this.http.post(`${apiUrl}login`, body).pipe(
      tap((response) => {
        console.log('Login response from backend:', response);
      })
    );
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return true;
    }
    const tokenData = this.parseJwt(token);
    const now = Date.now() / 1000;
    return tokenData && tokenData.exp < now;
  }

  logout() {
    localStorage.removeItem('token');
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }
}

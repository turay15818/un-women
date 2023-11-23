import { apiUrl } from 'src/variable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) { }

  checkTokenValidity(token: string) {
    return this.http.get(`${apiUrl}reset-password?token=${token}`);
  }

  resetPassword(token: string, password: string) {
    return this.http.post(`${apiUrl}reset-password?token=${token}`, { password });
  }
}


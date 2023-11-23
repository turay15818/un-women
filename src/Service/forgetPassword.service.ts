import { apiUrl } from 'src/variable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient) {}

  sendResetRequest(email: string) {
    const resetData = { email };
    return this.http.post(`${apiUrl}forget-password`, resetData);
  }
}

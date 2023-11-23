import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from 'src/variable';

@Injectable({
  providedIn: 'root',
})
export class BusinessProfileService {
  constructor(private http: HttpClient) {}

  createBusinessProfile(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => {
        observer.error('Authentication token is missing or expired');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${apiUrl}businessProfile`, formData, { headers });
  }

  editBusinessProfile(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => {
        observer.error('Authentication token is missing or expired');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.patch(`${apiUrl}businessProfile`, formData, { headers });
  }
}

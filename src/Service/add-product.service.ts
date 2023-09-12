import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '.././variable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddProductService {
  constructor(private http: HttpClient) {}
  addProduct(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => {
        observer.error('Authentication token is missing or expired');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${apiUrl}productsAndProductImages`, formData, { headers });
  }

  getProducts(): Observable<any> {
    return this.http.get(`${apiUrl}products`);
  }
}

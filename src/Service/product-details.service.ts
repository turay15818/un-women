import { apiUrl } from 'src/variable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailsService {
  constructor(private http: HttpClient) {}

  getProductByUid(uid: string) {
    return this.http.get(`${apiUrl}products/${uid}`);
  }
}

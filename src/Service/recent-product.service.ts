import { apiUrl } from '../variable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecentProductService {
  constructor(private http: HttpClient) {}

  getDistinctProducts(): Observable<any> {
    return this.http.get(`${apiUrl}fifteen-daays-products`);
  }
}

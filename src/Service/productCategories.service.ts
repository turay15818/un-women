import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { apiUrl } from '../variable';
@Injectable({
  providedIn: 'root',
})
export class ProductCategoriesService {
  constructor(private http: HttpClient) {}

  getProductCategories(category: string): Observable<any> {
    const url = `${apiUrl}products-by-categories/${category}`;
    return this.http.get(url);
  }
}

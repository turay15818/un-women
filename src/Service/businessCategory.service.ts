import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { apiUrl } from '../variable';
@Injectable({
  providedIn: 'root',
})
export class BusinessCategoryService {
  constructor(private http: HttpClient) {}

  getBusinessCategories(businessCategory: string): Observable<any> {
    const url = `${apiUrl}businessProfile-categories/${businessCategory}`;
    return this.http.get(url);
  }
}

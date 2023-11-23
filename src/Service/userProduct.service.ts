import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { apiUrl } from '../variable';
@Injectable({
  providedIn: 'root',
})
export class UserProductService {
  constructor(private http: HttpClient) {}

  getUserProduct(userId: string): Observable<any> {
    const url = `${apiUrl}individualProducts/${userId}`;
    return this.http.get(url);
  }
}  

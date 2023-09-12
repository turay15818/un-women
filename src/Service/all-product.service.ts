import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {apiUrl} from '.././variable'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AllProductService {
constructor(private http: HttpClient) {}

getDistinctProducts(): Observable<any> {
  return this.http.get(`${apiUrl}products`);
}

}

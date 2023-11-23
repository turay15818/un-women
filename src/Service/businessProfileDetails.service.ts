import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { apiUrl } from '../variable';
@Injectable({
  providedIn: 'root',
})
export class BusinessProfileDetailsService {
  constructor(private http: HttpClient) {}

  getBusinessProfileDetails(uuid: string): Observable<any> {
    const url = `${apiUrl}businessProfile-details/${uuid}`;
    return this.http.get(url);
  }
}

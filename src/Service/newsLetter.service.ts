import { apiUrl } from '../variable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterService {
  constructor(private http: HttpClient) {}

  createNewsletter(email: string): Observable<any> {
    return this.http.post(`${apiUrl}newsLetter`, { email });
  }
}

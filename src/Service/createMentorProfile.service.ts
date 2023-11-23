import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from '../variable';

@Injectable({
  providedIn: 'root',
})
export class CreateMentorProfileService {
  constructor(private http: HttpClient) {}

  createMentorProfile(mentorProfileData: any): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return new Observable((observer) => {
        observer.error('Authentication token is missing or expired');
      });
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(`${apiUrl}mentor-profile`, mentorProfileData, {
      headers,
    });
  }
}

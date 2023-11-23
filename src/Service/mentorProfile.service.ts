import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { apiUrl } from '../variable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MentorProfileService {
  constructor(private http: HttpClient) {}

  getUserMentorProfileById(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${apiUrl}mentor/my-profile`, { headers }).pipe(
      tap((response) => {}),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }

  getMentorProfile(): Observable<any> {
    return this.http.get(`${apiUrl}mentor-profile`).pipe(
      tap((response) => {}),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }

  getMentorProfileById(uuid: string): Observable<any> {
    return this.http.get(`${apiUrl}mentor-profile/${uuid}`).pipe(
      tap((response) => {}),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }
}
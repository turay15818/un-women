import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { apiUrl } from 'src/variable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataKey = 'userData';

  constructor(private http: HttpClient) {}

  setUser(data: any) {
    localStorage.setItem(this.userDataKey, JSON.stringify(data));
  }

  getUser() {
    const userData = localStorage.getItem(this.userDataKey);
    return userData ? JSON.parse(userData) : null;
  }

  clearUser() {
    localStorage.removeItem(this.userDataKey);
  }

  getUserData(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${apiUrl}me`, { headers }).pipe(
      tap((response) => {
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }


  getUserBusinessProfileById(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      return throwError('No token available');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${apiUrl}businessProfileByUser`, { headers }).pipe(
      tap((response) => {
  
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(error);
      })
    );
  }

  createUser(user: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('phoneNo', user.phoneNo);
    formData.append('homeAddress', user.homeAddress);
    formData.append('confPassword', user.confPassword);
    formData.append('file', file);

    const headers = new HttpHeaders();

    return this.http.post(`${apiUrl}users`, formData, { headers });
  }



  


}

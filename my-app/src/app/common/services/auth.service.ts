import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  onLogin(user: Partial<User>): Observable<User | null> {
    const params = new HttpParams({
      fromObject: { email: user.email || '' },
    });
    return this.http.get<User[]>(`${this.url}/users`, { params }).pipe(
      map((data: User[]) => {
        for (const userData of data) {
          if (user.password === userData.password) {
            localStorage.setItem('userToken', userData.fakeToken || '');
            return userData;
          }
        }
        return null;
      })
    );
  }

  onLogout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('userToken') ? true : false;
  }

  getUserInfo(): Observable<User | null> {
    const params = new HttpParams({
      fromObject: { fakeToken: localStorage.getItem('userToken') || '' },
    });
    return this.http.get<User[]>(`${this.url}/users`, { params }).pipe(
      map((data: User[]) => {
        return data?.length > 0 ? data[0] : null;
      })
    );
  }
}

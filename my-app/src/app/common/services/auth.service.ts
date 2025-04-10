import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  onLogin(user: Partial<User>): Observable<User> {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('userToken', user.id || '');
    return of(user as User)
  }

  onLogout(): void {
    localStorage.clear();
  }

  isAuthenticated(user: Partial<User>): boolean {
    return localStorage.getItem('userToken') ? true : false;
  }

  GetUserInfo(): string {
    const info = localStorage.getItem('userInfo');
    if (info) {
      return JSON.parse(info)?.email;
    }
    return '';
  }
}

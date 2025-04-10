import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  canActivate(arg0: any, id: any): import("@angular/router").MaybeAsync<import("@angular/router").GuardResult> {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  onLogin(user: Partial<User>): Observable<User> {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('userToken', user.id || '');
    return of(user as User)
  }

  onLogout(): void {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
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

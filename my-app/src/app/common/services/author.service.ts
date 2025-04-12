import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/courses.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.url}/authors`);
  }
}

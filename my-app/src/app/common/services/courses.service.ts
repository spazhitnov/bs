import { Injectable } from '@angular/core';
import { Course } from '../models/courses.model';
import { HelperService } from './helper.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private url: string = 'http://localhost:3000';
  courses: Course[] = [];

  constructor(private helper: HelperService, private http: HttpClient) {}

  getEmptyCourse(): Course {
    const newCourse = {} as Course;
    newCourse.id = this.helper.uuid();
    return newCourse;
  }

  getCourses(page: number): Observable<Course[]> {
    const params = new HttpParams({
      fromObject: { _start: 0, _limit: 5 * page, _sort: '-creationDate' },
    });
    return this.http.get<Course[]>(`${this.url}/courses`, { params });
  }

  removeCourse(id: string | number): Observable<Object> {
    return this.http.delete(`${this.url}/courses/${id}`);
  }

  getCourseById(id: string | number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/courses/${id}`);
  }

  updateCourse(newCourse: Course | null): Observable<Course> {
    return this.http.put<Course>(`${this.url}/courses/${newCourse?.id}`, {
      ...newCourse,
    });
  }

  createCourse(newCourse: Course | null): Observable<Course> {
    return this.http.post<Course>(`${this.url}/courses/`, { ...newCourse });
  }

  getListByTitle(title: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.url}/courses?title_like=${title.toLowerCase()}`);
  }
}

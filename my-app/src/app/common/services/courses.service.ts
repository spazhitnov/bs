import { Injectable } from '@angular/core';
import { Course } from '../models/courses.model';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  courses: Course[] = [
    {
      id: this.helper.uuid(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.generateDate(),
      title: 'Reprehenderit est veniam elit',
      duration: this.helper.generateDuration(),
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
    },
    {
      id: this.helper.uuid(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.generateDate(),
      title: 'Reprehenderit est veniam elit 2',
      duration: this.helper.generateDuration(),
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
    },
    {
      id: this.helper.uuid(),
      topRated: Math.random() > 0.5,
      creationDate: this.helper.generateDate(),
      title: 'Reprehenderit est veniam elit 3',
      duration: this.helper.generateDuration(),
      description:
        'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
    },
  ];

  constructor(private helper: HelperService) {}

  getCourses(): Course[] {
    return this.courses;
  }

  removeCourse(id: string | number): Course[] {
    this.courses = this.courses.filter((item) => {
      return item.id !== id;
    });
    return this.courses;
  }

  getCourseById(id: string | number): Course {
    return (
      this.courses.find((item) => {
        return item.id === id;
      }) || ({} as Course)
    );
  }

  updateCourse(course: Course): void {
    let courseInList = this.courses.find((item) => {
      return item.id === course.id;
    });
    courseInList = course;
  }

  createCourse(course: Course): void {
    this.courses.push(course);
  }
}

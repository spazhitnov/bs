import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/courses.model';

@Pipe({
  name: 'orderBy',
  standalone: true,
})
export class OrderByPipe implements PipeTransform {
  constructor() {}

  transform(value: Course[]): Course[] {
    if (!value) {
      value = [];
    }
    return value.sort((a, b) => {
      return a['creationDate'] < b['creationDate'] ? 1 : -1
    })
  }
}

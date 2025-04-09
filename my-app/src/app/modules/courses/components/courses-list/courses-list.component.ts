import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { Course } from 'src/app/common/models/courses.model';
import { HelperService } from 'src/app/common/services/helper.service';
import { CourseComponent } from './course/course.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { OrderByPipe } from 'src/app/common/pipes/order-by.pipe';
import { FilterPipe } from 'src/app/common/pipes/filter.pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BreadcrumbsComponent,
    CourseComponent,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    OrderByPipe,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  providers: [FilterPipe],
})
export class CoursesListComponent implements OnInit {
  allCourses: Course[] = [
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
  courses = signal<Course[]>([]);
  searchParam!: string;

  constructor(private helper: HelperService, private filterPipe: FilterPipe) {}

  ngOnInit(): void {
    this.courses.set(this.allCourses);
  }

  onSearch(): void {
    this.courses.set(
      this.searchParam
        ? this.filterPipe.transform(this.allCourses, this.searchParam)
        : this.allCourses
    );
    console.log('Search', this.searchParam);
  }

  onChange(course: Course): void {
    console.log('Changed', course);
  }

  onDelete(id: string | number): void {
    console.log('Deleted', id);
  }

  onLoad(): void {
    console.log('Some text');
  }
}

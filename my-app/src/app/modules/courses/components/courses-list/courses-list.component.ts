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
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent implements OnInit {
  courses = signal<Course[]>([]);
  searchParam!: string;

  constructor(private helper: HelperService) {}

  ngOnInit(): void {
    this.courses.set([
      {
        id: this.helper.uuid(),
        creationDate: new Date(),
        title: 'Reprehenderit est veniam elit',
        duration: this.helper.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: this.helper.uuid(),
        creationDate: new Date(),
        title: 'Reprehenderit est veniam elit 2',
        duration: this.helper.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
      {
        id: this.helper.uuid(),
        creationDate: new Date(),
        title: 'Reprehenderit est veniam elit 3',
        duration: this.helper.generateDuration(),
        description:
          'Sunt culpa officia minim commodo eiusmod irure sunt nostrud. Mollit aliquip id occaecat officia proident anim dolor officia qui voluptate consectetur laborum. Duis incididunt culpa aliqua mollit do fugiat ea dolor mollit irure Lorem tempor.',
      },
    ]);
  }

  onSearch(): void {
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

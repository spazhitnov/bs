import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { Course } from 'src/app/common/models/courses.model';
import { ButtonModule } from 'primeng/button';
import { DurationPipe } from 'src/app/common/pipes/duration.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, DurationPipe],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss',
})
export class CourseComponent {
  @Input() course!: Course;
  @Output() change = new EventEmitter<Course>();
  @Output() delete = new EventEmitter<string | number>();
}

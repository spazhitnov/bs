import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { LocalizedCalendarDirective } from 'src/app/common/directives/localized-calendar.directive';
import { Course } from 'src/app/common/models/courses.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/common/services/helper.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DurationComponent } from './duration/duration.component';
import { AuthorsComponent } from './authors/authors.component';
import { CoursesService } from 'src/app/common/services/courses.service';

@Component({
  selector: 'app-course-params',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputTextareaModule,
    CalendarModule,
    LocalizedCalendarDirective,
    DurationComponent,
    AuthorsComponent,
  ],
  templateUrl: './course-params.component.html',
  styleUrl: './course-params.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseParamsComponent implements OnInit {
  @Input() course!: Course;

  constructor(
    private coursesService: CoursesService,
    private activeRout: ActivatedRoute,
    private helper: HelperService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.activeRout.snapshot.params['id']) {
      this.course = this.coursesService.getCourseById(
        this.activeRout.snapshot.params['id']
      );
    } else {
      this.course = {} as Course;
      this.course.id = this.helper.uuid();
    }
  }

  onSave(): void {
    if (this.activeRout.snapshot.params['id']) {
      this.coursesService.updateCourse(this.course);
    } else {
      this.coursesService.createCourse(this.course);
    }
    this.onCancel()
  }

  onCancel(): void {
    this.helper.breadcrumbsItems$.next({routerLink: '/courses'})
    this.router.navigate(['/courses'])
  }
}

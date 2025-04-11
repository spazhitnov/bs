import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  signal,
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
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';

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
export class CourseParamsComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  course = signal<Course>({} as Course);
  isNew!: boolean;

  constructor(
    private coursesService: CoursesService,
    private activeRout: ActivatedRoute,
    private helper: HelperService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.helper.loading$.next(true)
    this.isNew = this.activeRout.snapshot.params['id'] ? false : true
    if (!this.isNew) {
      this.coursesService
        .getCourseById(this.activeRout.snapshot.params['id'])
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.course.set(data);
          this.helper.loading$.next(false)
        });
    } else {
      this.course.set({ id: this.helper.uuid() } as Course);
      this.helper.loading$.next(false)
    }
  }

  onSave(): void {
    this.helper.loading$.next(true)
    if (this.isNew) {
      this.coursesService
        .createCourse(this.course())
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.onCancel();
        });
    } else {
      this.coursesService
        .updateCourse(this.course())
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.onCancel();
        });
    }
  }

  onCancel(): void {
    this.helper.loading$.next(false)
    this.helper.breadcrumbsItems$.next({ routerLink: '/courses' });
    this.router.navigate(['/courses/list']);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { LocalizedCalendarDirective } from 'src/app/common/directives/localized-calendar.directive';
import { Course } from 'src/app/common/models/courses.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService, TForm } from 'src/app/common/services/helper.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DurationComponent } from './duration/duration.component';
import { AuthorsComponent } from './authors/authors.component';
import { CoursesService } from 'src/app/common/services/courses.service';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';
import { RequiredFiledDirective } from 'src/app/common/directives/required-field.directive';

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
    RequiredFiledDirective,
    ReactiveFormsModule,
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
  formGroup!: FormGroup;
  group!: TForm;

  constructor(
    private coursesService: CoursesService,
    private activeRout: ActivatedRoute,
    private helper: HelperService,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.helper.loading$.next(true);
    this.isNew = this.activeRout.snapshot.params['id'] ? false : true;
    if (!this.isNew) {
      this.coursesService
        .getCourseById(this.activeRout.snapshot.params['id'])
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.course.set(data);
          this.helper.loading$.next(false);
          this.buildForm();
        });
    } else {
      this.course.set({ id: this.helper.uuid() } as Course);
      this.helper.loading$.next(false);
      this.buildForm();
    }
  }

  private buildForm(): void {
    this.group = this.helper.createForm({
      title: [
        this.course().title,
        [Validators.required, Validators.maxLength(50)],
      ],
      description: [
        this.course().description,
        [Validators.required, Validators.maxLength(500)],
      ],
      creationDate: [
        this.course().creationDate
          ? new Date(this.course().creationDate)
          : null,
        Validators.required,
      ],
    });
    this.formGroup = this.group.form;

    this.formGroup.controls['title'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        this.course().title = changes;
      });
    this.formGroup.controls['description'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        this.course().description = changes;
      });
    this.formGroup.controls['creationDate'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        this.course().creationDate = new Date(changes);
      });
  }

  onSave(): void {
    this.helper.loading$.next(true);
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
    this.helper.loading$.next(false);
    this.helper.breadcrumbsItems$.next({ routerLink: '/courses/list' });
    this.router.navigate(['/courses/list']);
  }

  addSubForm(id: string | number): void {
    this.helper.addFormGroups(this.group.id, [id]);
  }

  isValid(): boolean {
    return this.helper.isFormValid(this.group.id);
  }
}

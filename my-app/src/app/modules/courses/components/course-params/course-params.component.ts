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
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';
import { RequiredFiledDirective } from 'src/app/common/directives/required-field.directive';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { getState } from 'src/app/store/courses/selectors/courses.selectors';
import { CoursesActions } from 'src/app/store/courses/actions/courses.actions';

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
    private activeRout: ActivatedRoute,
    private helper: HelperService,
    private router: Router,
    private store: Store<State>
  ) {
    super();
    store
      .select(getState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        if (data.updateCreateSuccess) {
          store.dispatch(CoursesActions.setSuccessFalse());
          this.onCancel();
        }
        if (data.course) {
          this.course.set({ ...data.course });
          if (!this.isNew && !this.formGroup) {
            this.buildForm();
          }
        }
        this.helper.loading$.next(data.loading);
      });
  }
  ngOnInit(): void {
    this.isNew = this.activeRout.snapshot.params['id'] ? false : true;
    if (!this.isNew) {
      this.store.dispatch(
        CoursesActions.getCourseById({
          id: this.activeRout.snapshot.params['id'],
        })
      );
    } else {
      this.course.set({ id: this.helper.uuid() } as Course);
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
    if (this.isNew) {
      this.store.dispatch(
        CoursesActions.createCourse({ course: this.course() })
      );
    } else {
      this.store.dispatch(
        CoursesActions.updateCourse({ course: this.course() })
      );
    }
  }

  onCancel(): void {
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

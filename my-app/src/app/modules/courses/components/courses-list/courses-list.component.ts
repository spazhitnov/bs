import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Course } from 'src/app/common/models/courses.model';
import { CourseComponent } from './course/course.component';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { OrderByPipe } from 'src/app/common/pipes/order-by.pipe';
import { CoursesService } from 'src/app/common/services/courses.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/common/services/helper.service';
import { filter, map, Subject, takeUntil, throttleTime } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';
import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { getState } from 'src/app/store/courses/selectors/courses.selectors';
import { CoursesActions } from 'src/app/store/courses/actions/courses.actions';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CourseComponent,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    OrderByPipe,
    ConfirmDialogModule,
  ],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
  providers: [ConfirmationService],
})
export class CoursesListComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  courses = signal<Course[]>([]);
  searchParams$ = new Subject<string>();
  page = 1;
  prevSearchValue!: string;
  isFirstSearch: boolean = true;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private helper: HelperService,
    private store: Store<State>
  ) {
    super();
    store
      .select(getState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.courses.set([...data.courses]);
        this.helper.loading$.next(data.loading);
      });
  }

  ngOnInit(): void {
    this.searchParams$
      .pipe(
        takeUntil(this.destroyed$),
        filter((value: string) => value.length > 2),
        throttleTime(250),
        map((value: string) => {
          return this.store.dispatch(
            CoursesActions.getCoursesByParams({ params: value })
          );
        })
      )
      .subscribe();
    this.store.dispatch(CoursesActions.getCourses());
  }

  onSearch(e: any): void {
    this.searchParams$.next(e.target.value);
  }

  onChange(course: Course): void {
    this.helper.breadcrumbsItems$.next({
      label: course.title,
      routerLink: `/courses/${course.id}`,
    });
    this.router.navigate([`/courses/${course.id}`]);
  }

  onDelete(data: { event: Event; id: string | number }): void {
    this.confirmationService.confirm({
      target: data.event.target as EventTarget,
      message: 'Вы действительно хотите удалить этот курс?',
      header: 'Удалить курс?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-sm p-button-danger',
      rejectButtonStyleClass: 'p-button-sm p-button-text p-button-text',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.store.dispatch(CoursesActions.deleteCourse({ id: data.id }));
      },
    });
  }

  onLoad(): void {
    this.page += 1;
    this.store.dispatch(CoursesActions.setPage({ page: this.page }));
    this.store.dispatch(CoursesActions.getCourses());
  }

  onAdd(): void {
    this.helper.breadcrumbsItems$.next({
      label: 'Новый курс',
      routerLink: '/courses/new',
    });
    this.router.navigate(['courses/new']);
  }

  onBlur(e: any): void {
    if (!e.target.value && (this.prevSearchValue || this.isFirstSearch)) {
      this.prevSearchValue = '';
      this.store.dispatch(CoursesActions.getCourses());
    } else {
      this.isFirstSearch = false;
      this.prevSearchValue = e.target.value;
    }
  }
}

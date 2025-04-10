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
import { FilterPipe } from 'src/app/common/pipes/filter.pipe';
import { CoursesService } from 'src/app/common/services/courses.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/common/services/helper.service';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';

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
  providers: [FilterPipe, ConfirmationService, MessageService],
})
export class CoursesListComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  courses = signal<Course[]>([]);
  searchParam!: string;
  page = 1;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private filterPipe: FilterPipe,
    private router: Router,
    private helper: HelperService,
    private coursesService: CoursesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.coursesService
      .getCourses(this.page)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.courses.set(data);
      });
  }

  onSearch(): void {
    if (this.searchParam) {
      this.coursesService
        .getListByTitle(this.searchParam)
        .pipe(takeUntil(this.destroyed$))
        .subscribe((data) => {
          this.courses.set(data);
        });
    } else {
      this.getCourses();
    }
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
        this.deleteCourse(data.id);
      },
    });
  }

  onLoad(): void {
    this.page += 1;
    this.getCourses();
  }

  onAdd(): void {
    this.helper.breadcrumbsItems$.next({
      label: 'Новый курс',
      routerLink: '/courses/new',
    });
    this.router.navigate(['courses/new']);
  }

  deleteCourse(id: string | number): void {
    this.coursesService
      .removeCourse(id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'error',
          detail: 'Курс удален',
        });
        this.getCourses();
      });
  }
}

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
export class CoursesListComponent implements OnInit {
  courses = signal<Course[]>([]);
  searchParam!: string;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private filterPipe: FilterPipe,
    private router: Router,
    private helper: HelperService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.courses.set(this.coursesService.getCourses());
  }

  onSearch(): void {
    this.courses.set(
      this.searchParam
        ? this.filterPipe.transform(
            this.coursesService.getCourses(),
            this.searchParam
          )
        : this.coursesService.getCourses()
    );
    console.log('Search', this.searchParam);
  }

  onChange(course: Course): void {
    console.log('Changed', course);
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
        this.courses.set(this.coursesService.removeCourse(data.id));
        this.messageService.add({
          severity: 'error',
          detail: 'Курс удален',
        });
      },
    });
  }

  onLoad(): void {
    console.log('Some text');
  }

  onAdd(): void {
    this.helper.breadcrumbsItems$.next({
      label: 'Новый курс',
      routerLink: '/courses/new',
    });
    this.router.navigate(['courses/new']);
  }
}

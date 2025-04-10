import { Route } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { CourseParamsComponent } from './components/course-params/course-params.component';

export const coursesRoutes: Route[] = [
  {
    path: 'courses',
    component: CoursesComponent,
    children: [
      {
        path: 'list',
        component: CoursesListComponent,
      },
      {
        path: 'new',
        component: CourseParamsComponent
      },
      {
        path: ':id',
        component: CourseParamsComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

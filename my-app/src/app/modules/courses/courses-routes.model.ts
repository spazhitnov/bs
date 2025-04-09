import { Route } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';

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
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
    ],
  },
];

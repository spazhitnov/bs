import { Route, RouterModule, Routes } from '@angular/router';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { CourseParamsComponent } from './components/course-params/course-params.component';
import { NoPageComponent } from 'src/app/common/components/no-page/no-page.component';
import { NgModule } from '@angular/core';

// export const coursesRoutes: Route[] = [
//   {
//     path: 'courses',
//     component: CoursesComponent,
//     children: [
//       {
//         path: 'list',
//         component: CoursesListComponent,
//       },
//       {
//         path: 'new',
//         component: CourseParamsComponent,
//       },
//       {
//         path: ':id',
//         component: CourseParamsComponent,
//       },
//       {
//         path: '',
//         redirectTo: 'list',
//         pathMatch: 'full',
//       },
//       {
//         path: '**',
//         component: NoPageComponent,
//       },
//     ],
//   },
// ];

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    children: [
      {
        path: 'list',
        component: CoursesListComponent,
      },
      {
        path: 'new',
        component: CourseParamsComponent,
      },
      {
        path: ':id',
        component: CourseParamsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}

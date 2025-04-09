import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { coursesRoutes } from './modules/courses/courses-routes.model';

const routes: Routes = [
  ...coursesRoutes,
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

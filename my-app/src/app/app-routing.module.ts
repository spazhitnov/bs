import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { coursesRoutes } from './modules/courses/courses-routes.model';
import { AuthComponent } from './modules/auth/auth.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  ...coursesRoutes,
  {
    path: 'auth',
    component: AppComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

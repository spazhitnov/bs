import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NoPageComponent } from './common/components/no-page/no-page.component';
import { provideGuardForPermission } from './common/services/guards/auth.guard';

const routes: Routes = [
  // ...coursesRoutes,
  {
    path: 'courses',
    loadChildren: () => import('./modules/courses/courses.module').then(mod => mod.CoursesModule),
    canActivate: [provideGuardForPermission()],
    canActivateChild: [provideGuardForPermission()],
  },
  {
    path: 'auth',
    component: AppComponent,
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

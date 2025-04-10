import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CoursesRoutingModule } from './courses-routes.model';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, RouterModule, BreadcrumbsComponent, CoursesRoutingModule],
})
export class CoursesModule {}

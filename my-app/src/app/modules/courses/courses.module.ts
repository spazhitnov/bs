import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [CoursesComponent],
  imports: [CommonModule, RouterModule, BreadcrumbsComponent],
})
export class CoursesModule {}

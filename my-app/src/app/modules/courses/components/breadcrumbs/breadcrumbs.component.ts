import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent {
  items: MenuItem[] = [
    {
      label: 'Курсы',
      icon: 'pi pi-home',
      routerLink: '/',
    },
  ];
}

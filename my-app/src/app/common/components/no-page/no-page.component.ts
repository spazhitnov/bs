import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-no-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './no-page.component.html',
  styleUrl: './no-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoPageComponent {
  constructor(private router: Router) {}

  close(): void {
    this.router.navigate(['courses/list']);
  }
}

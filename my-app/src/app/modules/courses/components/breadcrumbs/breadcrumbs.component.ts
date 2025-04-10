import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';
import { HelperService } from 'src/app/common/services/helper.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, BreadcrumbModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  items = signal<MenuItem[]>([
    {
      label: 'Курсы',
      icon: 'pi pi-home',
      routerLink: '/courses',
      command: () => {
        this.items.set(
          this.items().filter((item) => {
            return item.routerLink === '/courses';
          })
        );
      },
    },
  ]);

  constructor(private helper: HelperService) {
    super();
  }

  ngOnInit(): void {
    this.helper.breadcrumbsItems$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: MenuItem) => {
        if (data.routerLink === '/courses') {
          this.items.set(
            this.items().filter((item) => {
              return item.routerLink === '/courses';
            })
          );
        } else {
          this.items.set([...this.items(), data]);
        }
      });
  }
}

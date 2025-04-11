import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { User } from './common/models/user.model';
import { AuthService } from './common/services/auth.service';
import { AutoUnsubscribeDirective } from './common/directives/auto-unsubscribe.directive';
import { takeUntil } from 'rxjs';
import { HelperService } from './common/services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends AutoUnsubscribeDirective implements OnInit {
  isAuth = signal<boolean>(false);
  user = signal<User>({} as User);
  loader = signal<boolean>(false);

  constructor(
    private authService: AuthService,
    private helper: HelperService,

    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.navigate(['']);
    localStorage.clear();
    this.helper.loading$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: boolean) => {
        this.loader.set(data);
      });
  }

  onLogin(user: Partial<User>): void {
    user.id = this.helper.uuid();
    this.authService
      .onLogin(user)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: User | null) => {
        if (data) {
          this.user.set(data);
        }
        this.isAuth.set(this.authService.isAuthenticated());
        this.router.navigate(['courses']);
        console.log('Выполнен вход в систему');
      });
  }

  onLogout(): void {
    this.authService.onLogout();
    this.isAuth.set(false);
    this.user.set({} as User);
    this.router.navigate(['']);
  }
}

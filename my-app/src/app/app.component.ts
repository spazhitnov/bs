import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { User } from './common/models/user.model';
import { AutoUnsubscribeDirective } from './common/directives/auto-unsubscribe.directive';
import { takeUntil } from 'rxjs';
import { HelperService } from './common/services/helper.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from './store';
import { getState } from './store/auth/selectors/auth.selectors';
import { AuthActions } from './store/auth/actions/auth.actions';

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
    private helper: HelperService,
    private store: Store<State>,
    private router: Router
  ) {
    super();
    store
      .select(getState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.helper.loading$.next(data.loading);
        this.user.set((data.user as User) || ({} as User));
        this.isAuth.set(data.isAuth);
        if (data.isAuth) {
          this.router.navigate(['courses']);
          console.log('Выполнен вход в систему');
        }
        if (data.isLogout) {
          this.router.navigate(['']);
        }
      });
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
    this.store.dispatch(AuthActions.login({ user: user }));
  }

  onLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actionsAuth from '../actions/auth.actions';
import {
  catchError,
  combineLatest,
  map,
  mergeMap,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../..';
import { getState } from '../selectors/auth.selectors';
import { AuthService } from 'src/app/common/services/auth.service';

@Injectable()
export class AuthEffects {
  public loginEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsAuth.AuthActions.login),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.authService.onLogin(params?.[1]?.user || null).pipe(
          map((data) => {
            return actionsAuth.AuthActions.loginSuccess({ data });
          }),

          catchError((error) =>
            of(actionsAuth.AuthActions.loginFailure({ error }))
          )
        );
      })
    )
  );

  public loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          actionsAuth.AuthActions.loginSuccess
        ),
        map(() => {
          return actionsAuth.AuthActions.isAuth();
        })
      ),
    { dispatch: true }
  );

  public logoutEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsAuth.AuthActions.logout),
      switchMap(() => {
        return this.authService.onLogout().pipe(
          map((data) => {
            return actionsAuth.AuthActions.logoutSuccess({ data });
          }),
          catchError((error) =>
            of(actionsAuth.AuthActions.logoutFailure({ error }))
          )
        );
      })
    )
  );

  public logouSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsAuth.AuthActions.logoutSuccess),
        map(() => {
          return actionsAuth.AuthActions.isAuth();
        })
      ),
    { dispatch: true }
  );

  public isAuthEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsAuth.AuthActions.isAuth),
      switchMap(() => {
        return this.authService.isAuthenticated().pipe(
          map((data) => {
            return actionsAuth.AuthActions.isAuthSuccess({ data });
          }),
          catchError((error) =>
            of(actionsAuth.AuthActions.logoutFailure({ error }))
          )
        );
      })
    )
  );

  public getUserInfoEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsAuth.AuthActions.getUser),
      switchMap(() => {
        return this.authService.getUserInfo().pipe(
          map((data) => {
            return actionsAuth.AuthActions.getUserSuccess({ data });
          }),
          catchError((error) =>
            of(actionsAuth.AuthActions.logoutFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private authService: AuthService
  ) {}
}

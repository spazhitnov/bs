import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from 'src/app/common/models/user.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Get State': emptyProps(),
    'Get User': emptyProps(),
    'Get User Success': props<{ data: unknown }>(),
    'Get User Failure': props<{ error: unknown }>(),
    'Login': props<{ user: Partial<User> }>(),
    'Login Success': props<{ data: unknown }>(),
    'Login Failure': props<{ error: unknown }>(),
    'Logout': emptyProps(),
    'Logout Success': props<{ data: unknown }>(),
    'Logout Failure': props<{ error: unknown }>(),
    'Is Auth': emptyProps(),
    'Is Auth Success': props<{ data: unknown }>(),
    'Is Auth Failure': props<{ error: unknown }>(),
  },
});

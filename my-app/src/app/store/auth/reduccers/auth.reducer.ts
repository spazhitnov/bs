import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import { User } from 'src/app/common/models/user.model';

export const authFeatureKey = 'auth';

export interface StateAuthReducer {
  loading: boolean;
  user: Partial<User> | null;
  isAuth: boolean;
  isLogout: boolean;
}

export const initialState: StateAuthReducer = {
  loading: false,
  user: null,
  isAuth: false,
  isLogout: false,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.getState, (state) => {
    return { ...state };
  }),
  on(AuthActions.login, (state, { user }) => {
    return { ...state, user: user };
  }),
  on(AuthActions.loginSuccess, (state, { data }) => {
    return { ...state, user: data ? (data as User) : null };
  }),
  on(AuthActions.logout, (state) => {
    return { ...state };
  }),
  on(AuthActions.logoutSuccess, (state) => {
    return { ...state, isLogout: true };
  }),
  on(AuthActions.isAuth, (state) => {
    return {
      ...state,
    };
  }),
  on(AuthActions.isAuthSuccess, (state, { data }) => {
    return {
      ...state,
      isAuth: data as boolean,
    };
  }),
  on(AuthActions.getUser, (state) => {
    return {
      ...state,
    };
  }),
  on(AuthActions.getUserSuccess, (state, { data }) => {
    return {
      ...state,
      user: data ? (data as User) : null,
    };
  })
);

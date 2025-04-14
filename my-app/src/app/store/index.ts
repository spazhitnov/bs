import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as courses from './courses/reduccers/courses.reducer';
import * as auth from './auth/reduccers/auth.reducer';

export interface State {
  [courses.coursesFeatureKey]: typeof courses.initialState;
  [auth.authFeatureKey]: typeof auth.initialState;
}

export const reducers: ActionReducerMap<State> = {
  [courses.coursesFeatureKey]: courses.reducer,
  [auth.authFeatureKey]: auth.reducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

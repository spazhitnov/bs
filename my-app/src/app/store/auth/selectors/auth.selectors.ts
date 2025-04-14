import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from '../reduccers/auth.reducer';

export const selectCoursesState = createFeatureSelector<auth.StateAuthReducer>(
  auth.authFeatureKey
);
export const getState = createSelector(selectCoursesState, (state) => {
  return state;
});

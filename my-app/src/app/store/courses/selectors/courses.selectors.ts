import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as courses from '../reduccers/courses.reducer';

export const selectCoursesState = createFeatureSelector<courses.StateReducer>(
  courses.coursesFeatureKey
);
export const getState = createSelector(selectCoursesState, (state) => {
  return state;
});
export const getCourses = createSelector(selectCoursesState, (state) => {
  return state.courses;
});

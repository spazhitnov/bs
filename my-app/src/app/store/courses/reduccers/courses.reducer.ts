import { createReducer, on } from '@ngrx/store';
import { CoursesActions } from '../actions/courses.actions';
import { Course } from 'src/app/common/models/courses.model';

export const coursesFeatureKey = 'courses';

export interface StateReducer {
  loading: boolean;
  page: number;
  courses: Course[];
  searchParams: string;
  id: string | number;
  course: Course | null;
  updateCreateSuccess: boolean;
}

export const initialState: StateReducer = {
  loading: false,
  page: 1,
  courses: [],
  searchParams: '',
  id: '',
  course: null,
  updateCreateSuccess: false
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.getState, (state) => {
    return { ...state };
  }),
  on(CoursesActions.getCourses, (state) => {
    return { ...state, loading: true };
  }),
  on(CoursesActions.getCoursesSuccess, (state, { data }) => {
    return {
      ...state,
      courses: data as Course[],
      loading: false,
    };
  }),
  on(CoursesActions.setPage, (state, { page }) => {
    return { ...state, page: page };
  }),
  on(CoursesActions.getCoursesByParams, (state, { params }) => {
    return { ...state, searchParams: params };
  }),
  on(CoursesActions.deleteCourse, (state, { id }) => {
    return { ...state, id: id, loading: true };
  }),
  on(CoursesActions.createCourse, (state, { course }) => {
    return { ...state, course: course, loading: true };
  }),
  on(CoursesActions.updateCourse, (state, { course }) => {
    return { ...state, updateCreateSuccess: false, course: course, loading: true };
  }),
  on(CoursesActions.updateCreateSuccess, (state) => {
    return { ...state, updateCreateSuccess: true, loading: false };
  }),
  on(CoursesActions.getCourseById, (state, {id}) => {
    return { ...state, id: id, loading: false };
  }),
  on(CoursesActions.getCourseByIdSuccess, (state, { data }) => {
    return {
      ...state,
      courses: [],
      id: '',
      course: data as Course,
      loading: false,
    };
  }),
  on(CoursesActions.setSuccessFalse, (state) => {
    return { ...state, updateCreateSuccess: false };
  }),
);

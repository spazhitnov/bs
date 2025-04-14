import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from 'src/app/common/models/courses.model';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Get State': emptyProps(),
    'Get Courses': emptyProps(),
    'Get Courses Success': props<{ data: unknown }>(),
    'Get Courses Failure': props<{ error: unknown }>(),
    'Set Page': props<{ page: number }>(),
    'Get Courses By Params': props<{ params: string }>(),
    'Delete Course': props<{ id: string | number }>(),
    'Delete Course Success': emptyProps(),
    'Delete Course Failure': props<{ error: unknown }>(),
    'Get Course By Id': props<{ id: string | number }>(),
    'Get Course By Id Success': props<{ data: unknown }>(),
    'Get Course By Id Failure': props<{ error: unknown }>(),
    'Update Course': props<{ course: Course }>(),
    'Create Course': props<{ course: Course }>(),
    'Update Create Success': emptyProps(),
    'Update Create Failure': props<{ error: unknown }>(),
    'Set Success False': emptyProps(),
  },
});

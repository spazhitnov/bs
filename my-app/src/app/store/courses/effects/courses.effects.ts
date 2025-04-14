import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actionsCourses from '../actions/courses.actions';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { CoursesService } from 'src/app/common/services/courses.service';
import { Store } from '@ngrx/store';
import { State } from '../..';
import { getState } from '../selectors/courses.selectors';
import { MessageService } from 'primeng/api';

@Injectable()
export class CoursesEffects {
  public coursesEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCourses.CoursesActions.getCourses),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.coursesService.getCourses(params?.[1]?.page || 1).pipe(
          map((data) => {
            return actionsCourses.CoursesActions.getCoursesSuccess({ data });
          }),
          catchError((error) =>
            of(actionsCourses.CoursesActions.getCoursesFailure({ error }))
          )
        );
      })
    )
  );

  public getCoursesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsCourses.CoursesActions.getCoursesSuccess),
        tap((data) => {
          return of(data.data);
        })
      ),
    { dispatch: false }
  );

  public coursesParamsEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCourses.CoursesActions.getCoursesByParams),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.coursesService.getListByTitle(params[1]?.searchParams).pipe(
          map((data) => {
            return actionsCourses.CoursesActions.getCoursesSuccess({
              data,
            });
          }),
          catchError((error) =>
            of(actionsCourses.CoursesActions.getCoursesFailure({ error }))
          )
        );
      })
    )
  );

  public deleteCourseEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCourses.CoursesActions.deleteCourse),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.coursesService.removeCourse(params?.[1]?.id).pipe(
          map((data) => {
            return actionsCourses.CoursesActions.deleteCourseSuccess();
          }),
          catchError((error) =>
            of(actionsCourses.CoursesActions.deleteCourseFailure({ error }))
          )
        );
      })
    )
  );

  public deleteCoursesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionsCourses.CoursesActions.deleteCourseSuccess),
        map((data) => {
          this.messageService.add({
            severity: 'error',
            detail: 'Курс удален',
          });
          return actionsCourses.CoursesActions.getCourses();
        })
      ),
    { dispatch: true }
  );

  public createCourseEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCourses.CoursesActions.createCourse),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.coursesService.createCourse(params?.[1]?.course).pipe(
          map((data) => {
            return actionsCourses.CoursesActions.updateCreateSuccess();
          }),
          catchError((error) =>
            of(actionsCourses.CoursesActions.updateCreateFailure({ error }))
          )
        );
      })
    )
  );

  public updateCourseEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCourses.CoursesActions.updateCourse),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.coursesService.updateCourse(params?.[1]?.course).pipe(
          map((data) => {
            return actionsCourses.CoursesActions.updateCreateSuccess();
          }),
          catchError((error) =>
            of(actionsCourses.CoursesActions.updateCreateFailure({ error }))
          )
        );
      })
    )
  );

  public getCourseByIdEffects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actionsCourses.CoursesActions.getCourseById),
      withLatestFrom(this.store.select(getState)),
      switchMap((params) => {
        return this.coursesService.getCourseById(params?.[1]?.id).pipe(
          map((data) => {
            return actionsCourses.CoursesActions.getCourseByIdSuccess({ data });
          }),
          catchError((error) =>
            of(actionsCourses.CoursesActions.getCourseByIdFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private coursesService: CoursesService,
    private messageService: MessageService
  ) {}
}

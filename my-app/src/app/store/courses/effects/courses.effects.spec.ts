import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import {  } from './courses.effects';

describe('', () => {
  let actions$: Observable<any>;
  let effects: ;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject();
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});

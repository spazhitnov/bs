import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  breadcrumbsItems$ = new Subject<MenuItem>()

  constructor() {}

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  generateDuration(): number {
    return Number((Math.random() * 1000).toFixed(0));
  }

  generateDate(): Date {
    return new Date(
      new Date().setHours(
        new Date().getHours() +
          +((Math.random() < 0.5 ? -1 : 1) * Math.random() * 1000).toFixed(0)
      )
    );
  }
}

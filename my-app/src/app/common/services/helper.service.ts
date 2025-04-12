import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';

export type TForm = {
  form: FormGroup;
  subFormIds?: (number | string)[];
  controlSub: Subject<{ [key: string]: boolean }>;
  id: number | string;
  controls: { [key: string]: boolean };
};
type TFormControl = {
  [key: string]: TForm;
};

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private forms = {} as TFormControl;
  breadcrumbsItems$ = new Subject<MenuItem>();
  loading$ = new Subject<boolean>();

  constructor(private formBuilder: FormBuilder) {}

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

  public createForm(items: any): TForm {
    const id = this.uuid();
    for (const key in items) {
      if (
        typeof items[key][0] !== 'object' &&
        typeof items[key][0] !== 'function'
      ) {
        items[key][0] = this.isNotNull(items[key][0]) ? items[key][0] : null;
      }
    }

    const group = this.formBuilder.group(items);
    const controls = Object.keys(group.controls).reduce((acc: any, item) => {
      acc[item] = false;
      return acc;
    }, {});
    this.setActiveForm(id, group, controls);
    return this.getActiveForm(id);
  }

  setActiveForm(
    id: number | string,
    form: FormGroup,
    controls: { [key: string]: boolean }
  ) {
    this.forms[id] = {} as TForm;
    this.forms[id].controlSub = new Subject<{ [key: string]: boolean }>();
    this.forms[id].controls = controls;
    this.forms[id].form = form;
    this.forms[id].id = id;
    this.forms[id].controlSub.next(controls);
  }

  getActiveForm(id: number | string): TForm {
    return this.forms[id];
  }

  isNotNull(value: any): boolean {
    return value !== null && value !== undefined && value !== '';
  }

  addFormGroups(id: number | string, subFormIds: (number | string)[]) {
    const activeForm = this.getActiveForm(id);
    if (activeForm?.subFormIds) {
      for (const formId of subFormIds) {
        if (!activeForm.subFormIds.includes(formId)) {
          activeForm.subFormIds.push(formId);
        }
      }
    } else if (activeForm) {
      activeForm.subFormIds = [...subFormIds];
    }
  }

  public isFormValid(
    id: string | number,
  ): boolean {
    const formIds = this.getAllSubFormIds([], id);
    for (const formId of formIds) {
      let result = true;
      const form = this.getActiveForm(formId)?.form;
      if (form) {
        result = this.getFormStateByKeys(form);
      }
      if (!result) {
        return result;
      }
    }
    return true;
  }

  private getAllSubFormIds(
    list: (string | number)[],
    id: string | number
  ): (string | number)[] {
    list.push(id);
    const subFormIds = this.getActiveForm(id)?.subFormIds || [];
    for (const fId of subFormIds) {
      list.concat(this.getAllSubFormIds(list, fId));
    }
    return list;
  }

  public getFormStateByKeys(
    form: FormGroup,
  ): boolean {
    form.updateValueAndValidity();
    if (form) {
      return !Object.keys(form.controls).some((key) => {
        return form.controls[key].status === 'INVALID';
      });
    }
    return true;
  }
}

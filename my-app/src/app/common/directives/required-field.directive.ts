import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnInit,
  Optional,
  Self,
} from '@angular/core';
import { NgControl, Validators } from '@angular/forms';
import { errorMessages } from '../models/validation.model';
import { AutoUnsubscribeDirective } from './auto-unsubscribe.directive';
import { takeUntil } from 'rxjs';

@Directive({
  selector: '[requiredField]',
  standalone: true,
})
export class RequiredFiledDirective
  extends AutoUnsubscribeDirective
  implements AfterViewInit, OnInit
{
  firstTimeChange = true;

  constructor(
    private readonly element: ElementRef,
    @Optional() @Self() private _ngControl: NgControl
  ) {
    super();
  }

  ngOnInit(): void {
    this._ngControl.control?.statusChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        if (
          !this._ngControl.control?.valid &&
          this._ngControl.control?.touched
        ) {
          this._ngControl.control?.markAsTouched({ onlySelf: true });
          this._ngControl.control?.markAsDirty({ onlySelf: true });
        }
        this.messageController();
      });
    this._ngControl.control?.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        if (this.firstTimeChange) {
          this.firstTimeChange = false;
        } else {
          this._ngControl.control?.markAsTouched({ onlySelf: true });
        }
      });
  }

  ngAfterViewInit(): void {
    const box: HTMLElement | null =
      (this.element.nativeElement &&
        this.element.nativeElement.closest('.p-float-label')) ||
      null;
    if (!box) {
      return;
    }
    const label = box.querySelector('label');
    if (!label) {
      return;
    }
    if (
      this.element.nativeElement.required ||
      this._ngControl.control?.hasValidator(Validators.required)
    ) {
      label.innerText += '*';
    }
  }

  private messageController(): void {
    const control = this._ngControl.control;
    const box: HTMLElement | null =
      (this.element.nativeElement &&
        this.element.nativeElement.closest('.p-float-label')?.closest('div')) ||
      null;
    if (!box) {
      return;
    }
    const errorType = control?.errors && Object.keys(control.errors)?.[0];
    if (control?.invalid && control.touched) {
      this.messageCreate(
        this.element.nativeElement,
        box,
        this.getErrorMessage(String(errorType))
      );
    } else {
      this.messageRemove(box);
    }
  }

  private messageCreate(
    nativeElement: HTMLElement | null,
    box: HTMLElement,
    errorText: string
  ): void {
    nativeElement && nativeElement.classList.add('ng-invalid');
    nativeElement && nativeElement.classList.add('ng-dirty');
    this.createErrorMessage(box, errorText);
  }

  private messageRemove(box: HTMLElement): void {
    const message = box.querySelector('.error-text');
    if (message) {
      box.removeChild(message);
    }
  }

  private createErrorMessage(el: HTMLElement, text: string): void {
    const message: HTMLElement | null = el.querySelector('.error-text-message');
    if (message) {
      message.innerText = text;
      return;
    }
    const small = document.createElement('small');
    small.classList.add('error-text');
    small.classList.add('p-error');
    const p = document.createElement('p');
    p.classList.add('error-text-message');
    p.classList.add('pt-2');
    p.classList.add('pl-2');
    p.classList.add('m-0');
    p.innerText = text;
    small.appendChild(p);
    el.appendChild(small);
  }

  getErrorMessage(errorType: string): string {
    let res = '';
    switch (errorType) {
      case 'maxlength':
      case 'minLength':
        res = `${errorMessages[errorType as keyof typeof errorMessages]} ${
          this._ngControl.control?.errors?.[errorType].requiredLength
        }`;
        break;
      default:
        res = errorMessages[errorType as keyof typeof errorMessages];
    }
    return res;
  }
}

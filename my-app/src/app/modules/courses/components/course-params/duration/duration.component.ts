import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';
import { RequiredFiledDirective } from 'src/app/common/directives/required-field.directive';
import { Course } from 'src/app/common/models/courses.model';
import { DurationPipe } from 'src/app/common/pipes/duration.pipe';
import { HelperService, TForm } from 'src/app/common/services/helper.service';

@Component({
  selector: 'app-duration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputNumberModule,
    DurationPipe,
    RequiredFiledDirective,
  ],
  templateUrl: './duration.component.html',
  styleUrl: './duration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  @Output() formGroupReady = new EventEmitter<string | number>();
  course = input<Course>({} as Course);
  formGroup!: FormGroup;
  group!: TForm;

  constructor(private helper: HelperService) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.group = this.helper.createForm({
      duration: [this.course().duration, Validators.required],
    });
    this.formGroup = this.group.form;
    this.formGroupReady.emit(this.group.id);

    this.formGroup.controls['duration'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        this.course().duration = changes || 0;
      });
  }
}

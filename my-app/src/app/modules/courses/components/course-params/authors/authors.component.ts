import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { takeUntil } from 'rxjs';
import { AutoUnsubscribeDirective } from 'src/app/common/directives/auto-unsubscribe.directive';
import { RequiredFiledDirective } from 'src/app/common/directives/required-field.directive';
import { Author, Course } from 'src/app/common/models/courses.model';
import { AuthorService } from 'src/app/common/services/author.service';
import { HelperService, TForm } from 'src/app/common/services/helper.service';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MultiSelectModule,
    RequiredFiledDirective,
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent
  extends AutoUnsubscribeDirective
  implements OnInit
{
  @Output() formGroupReady = new EventEmitter<string | number>();
  course = input<Course>({} as Course);
  authors = signal<Author[]>([]);
  selectedAuthors = [];
  formGroup!: FormGroup;
  group!: TForm;

  constructor(
    private helper: HelperService,
    private authorService: AuthorService
  ) {
    super();
  }

  ngOnInit(): void {
    this.helper.loading$.next(true);
    this.authorService
      .getAuthors()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.authors.set(data);
        this.helper.loading$.next(false);
        this.buildForm();
      });
  }

  private buildForm(): void {
    this.group = this.helper.createForm({
      authors: [this.course().authors, Validators.required],
    });
    this.formGroup = this.group.form;
    this.formGroupReady.emit(this.group.id);

    this.formGroup.controls['authors'].valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe((changes) => {
        this.course().authors = changes || [];
      });
  }
}

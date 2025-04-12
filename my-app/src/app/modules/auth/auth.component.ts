import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  signal,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/common/models/user.model';
import { HelperService } from 'src/app/common/services/helper.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  @Output() login = new EventEmitter<Partial<User>>();

  constructor(private helper: HelperService) {}

  onSubmit(form: NgForm): void {
    if (form.form.valid) {
      const email = form.controls?.['email']?.value;
      const password = form.controls?.['password']?.value;
      this.login.emit({ email, password });
    }
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/common/models/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  @Output() login = new EventEmitter<Partial<User>>();
  email!: string;
  password!: string;
}

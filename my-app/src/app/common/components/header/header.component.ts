import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, LogoComponent, ButtonModule],
  standalone: true,
})
export class HeaderComponent {
  @Output() logout = new EventEmitter();
  isAuth = input<boolean>();
  user = input<User>();

  getUserFIO(): string {
    if (this.user()?.firstName && this.user()?.lastName) {
      return `${this.user()?.firstName} ${this.user()?.lastName}`;
    }
    return this.user()?.email || '';
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [CommonModule, LogoComponent, ButtonModule],
  standalone: true
})
export class HeaderComponent {

}

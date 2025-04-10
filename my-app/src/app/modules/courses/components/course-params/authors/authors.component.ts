import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [CommonModule, FormsModule, MultiSelectModule],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent {
  authors = [
    { brief: 'Author 1', value: 'A1' },
    { brief: 'Author 2', value: 'A2' },
    { brief: 'Author 3', value: 'A3' },
    { brief: 'Author 4', value: 'A4' },
    { brief: 'Author 5', value: 'A5' },
  ];
  selectedAuthors = [];
}

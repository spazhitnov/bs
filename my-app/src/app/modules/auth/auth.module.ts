import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthComponent } from './auth.component';
import { RequiredFiledDirective } from 'src/app/common/directives/required-field.directive';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    RequiredFiledDirective
  ],
  exports: [AuthComponent],
})
export class AuthModule {}

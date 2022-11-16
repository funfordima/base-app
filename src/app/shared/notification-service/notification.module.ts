import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { MessageComponent } from './components/message/message.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [
    MessageComponent,
    AlertComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    A11yModule,
  ],
  exports: [AlertComponent],
})
export class NotificationModule { }

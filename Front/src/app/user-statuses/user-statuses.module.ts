import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserStatusesRoutingModule } from './user-statuses-routing.module';
import { StatusesHomeComponent } from './statuses-home/statuses-home.component';

import { MatButtonModule } from '@angular/material/button';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { AddModalComponent } from './add-modal/add-modal.component';
import { UpdateModalComponent } from './update-modal/update-modal.component';

@NgModule({
  declarations: [StatusesHomeComponent, AddModalComponent, UpdateModalComponent],
  imports: [
    CommonModule,
    UserStatusesRoutingModule,
    CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class UserStatusesModule {}

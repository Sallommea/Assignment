import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewComponent } from './add-new/add-new.component';
import { UpdateComponent } from './update/update.component';
import { UsersListHomeComponent } from './users-list-home/users-list-home.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListHomeComponent,
  },
  { path: 'add-new', component: AddNewComponent },
  { path: 'update/:id', component: UpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersListRoutingModule {}

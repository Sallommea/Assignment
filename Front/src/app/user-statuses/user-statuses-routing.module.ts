import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatusesHomeComponent } from './statuses-home/statuses-home.component';

const routes: Routes = [
  {
    path: '',
    component: StatusesHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserStatusesRoutingModule {}

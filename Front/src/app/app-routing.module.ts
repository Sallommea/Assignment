import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: 'userStatuses',
    loadChildren: () =>
      import('./user-statuses/user-statuses.module').then(
        (m) => m.UserStatusesModule
      ),
  },
  {
    path: 'usersList',
    loadChildren: () =>
      import('./users-list/users-list.module').then((m) => m.UsersListModule),
  },
  {
    path: 'userDetails',
    loadChildren: () =>
      import('./categories/categories.module').then((m) => m.CategoriesModule),
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

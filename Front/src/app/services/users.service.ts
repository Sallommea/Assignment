import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedUsers } from '../models/paginated-users.model';
import { Usser } from '../models/user.model';
import { User } from '../models/user.model';
import { Ussser } from '../models/user.model';
import { UserSearch } from '../models/user.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  baseUrl: string = 'https://localhost:7216/';

  constructor(private http: HttpClient) {}

  getAllUsers(page: number, itemsPerPage: number): Observable<PaginatedUsers> {
    return this.http.get<PaginatedUsers>(
      `${this.baseUrl}users/get-paginated/${page}/${itemsPerPage}`
    );
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/get-by-id/${id}`);
  }
  addUser(user: Usser) {
    return this.http.post<Usser>(`${this.baseUrl}users/add-new`, user);
  }

  updateUser(user: Ussser) {
    return this.http.put<Ussser>(`${this.baseUrl}users/update`, user);
  }
  deleteUser(id: number) {
    return this.http.delete(`${this.baseUrl}users/delete/${id}`);
  }
  filterUsers(
    page: number,
    itemsPerPage: number,
    user: UserSearch
  ): Observable<PaginatedUsers> {
    return this.http.post<PaginatedUsers>(
      `${this.baseUrl}users/filter/${page}/${itemsPerPage}`,
      user
    );
  }
}

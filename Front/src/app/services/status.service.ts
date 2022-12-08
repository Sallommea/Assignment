import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedStatuses } from '../models/paginated-statuses.model';
import { Status } from '../models/status.model';
@Injectable({
  providedIn: 'root',
})
export class StatusService {
  baseUrl: string = 'https://localhost:7216/';

  constructor(private http: HttpClient) {}

  getAllStatus(
    page: number,
    itemsPerPage: number
  ): Observable<PaginatedStatuses> {
    return this.http.get<PaginatedStatuses>(
      `${this.baseUrl}statuses/get-paginated/${page}/${itemsPerPage}`
    );
  }

  getAll(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}statuses/get-all`);
  }

  filterStatus(
    page: number,
    itemsPerPage: number,
    filterValue: string
  ): Observable<PaginatedStatuses> {
    return this.http.get<PaginatedStatuses>(
      `${this.baseUrl}statuses/filter/${page}/${itemsPerPage}/${filterValue}`
    );
  }

  addStatus(status: string) {
    return this.http.post(`${this.baseUrl}statuses/add-new/${status}`, status);
  }

  updateStatus(id: number, newName: string) {
    return this.http.put(`${this.baseUrl}statuses/update/${id}/${newName}`, {});
  }

  deleteStatus(id: number) {
    return this.http.delete(`${this.baseUrl}statuses/delete/${id}`);
  }
}

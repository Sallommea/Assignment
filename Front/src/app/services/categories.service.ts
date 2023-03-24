import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedCategories } from '../models/paginated-categories.model';
import { Category } from '../models/category.model';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl: string = 'https://localhost:7216/';

  constructor(private http: HttpClient) {}

  getAllCategories(
    page: number,
    itemsPerPage: number
  ): Observable<PaginatedCategories> {
    return this.http.get<PaginatedCategories>(
      `${this.baseUrl}categories/get-paginated/${page}/${itemsPerPage}`
    );
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}categories/get-all`);
  }

  filterCategories(
    page: number,
    itemsPerPage: number,
    filterValue: string
  ): Observable<PaginatedCategories> {
    return this.http.get<PaginatedCategories>(
      `${this.baseUrl}categories/filter/${page}/${itemsPerPage}/${filterValue}`
    );
  }

  addCategory(category: string) {
    return this.http.post<string>(
      `${this.baseUrl}categories/add-new/${category}`,
      category
    );
  }

  updateCategory(id: number, newName: string) {
    return this.http.put(
      `${this.baseUrl}categories/update/${id}/${newName}`,
      {}
    );
  }
  deleteCategory(id: number) {
    return this.http.delete<Category>(`${this.baseUrl}categories/delete/${id}`);
  }
}

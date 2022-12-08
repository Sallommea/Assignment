import { Category } from './category.model';

export interface PaginatedCategories {
  categories: Category[];
  rowNumber: number;
}

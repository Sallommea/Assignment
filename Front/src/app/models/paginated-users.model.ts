import { User } from './user.model';
export interface PaginatedUsers {
  users: User[];
  rowNumber: number;
}

import { Status } from './status.model';
export interface PaginatedStatuses {
  statuses: Status[];
  rowNumber: number;
}

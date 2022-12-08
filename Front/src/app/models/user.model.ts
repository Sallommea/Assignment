export interface Name {
  id: number;
  name: string;
}

export interface User {
  id?: number;
  email: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  category: Name;
  status: Name;
}

export interface Usser {
  id?: number;
  email: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  category: number;
  status: number;
}
export interface Ussser {
  id?: number;
  email: string;
  personalNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  categoryId: number;
  statusId: number;
}
export interface UserSearch {
  emailFilter: string;
  personalNumberFilter: string;
  firstNameFilter: string;
  lastNameFilter: string;
  dateOfBirthStart: string;
  dateOfBirthEnd: string;
  categoryIdFilter: number;
  statusIdFilter: number;
}

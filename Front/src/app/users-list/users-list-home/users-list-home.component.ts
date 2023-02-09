import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { User, UserSearch } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { Status } from 'src/app/models/status.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { StatusService } from 'src/app/services/status.service';
import { UserStatusesRoutingModule } from 'src/app/user-statuses/user-statuses-routing.module';
@Component({
  selector: 'app-users-list-home',
  templateUrl: './users-list-home.component.html',
  styleUrls: ['./users-list-home.component.css'],
})
export class UsersListHomeComponent implements AfterViewInit, OnInit {
  totalRows = 0;
  searchFilter: UserSearch;
  pageSize = 5;
  filterPage = 0;
  currentPage = 0;
  users: User[] = [];
  user: User;
  categories: Category[] = [];
  status: Status[] = [];
  pageSizeOptions: number[] = [5, 10];
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'personalNumber',
    'dateOfBirth',
    'email',
    'category',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<User> = new MatTableDataSource();

  searchForm: FormGroup = new FormGroup({
    firstNameFilter: new FormControl(),
    lastNameFilter: new FormControl(),
    personalNumberFilter: new FormControl(),
    emailFilter: new FormControl(),
    dateOfBirthStart: new FormControl(),
    dateOfBirthEnd: new FormControl(),
    categoryIdFilter: new FormControl(),
    statusIdFilter: new FormControl(),
  });

  constructor(
    private usersService: UsersService,
    private categoryService: CategoriesService,
    private statusService: StatusService,
    private router: Router
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadData();
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
    this.statusService.getAll().subscribe((res) => (this.status = res));
  }

  loadData() {
    this.usersService
      .getAllUsers(this.currentPage, this.pageSize)
      .subscribe((res) => {
        this.dataSource.data = res.users;
        setTimeout(() => {
          this.paginator.pageIndex = this.currentPage;
          this.paginator.length = res.rowNumber;
          this.totalRows = res.rowNumber;
        });
      });
  }
  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.filterPage = event.pageIndex;

    if (
      this.searchFilter != undefined ||
      this.searchFilter?.categoryIdFilter != null ||
      this.searchFilter?.statusIdFilter != null ||
      this.searchFilter?.dateOfBirthEnd != null ||
      this.searchFilter?.dateOfBirthStart != null ||
      this.searchFilter?.emailFilter !== '' ||
      this.searchFilter?.firstNameFilter !== '' ||
      this.searchFilter?.lastNameFilter != null
    ) {
      this.onSubmit();
      return;
    }

    this.loadData();
  }

  applyFilter(event: Event) {
    // For rerendering list after deleting input values
    const filterValue = (event.target as HTMLInputElement).value;
    const None = (event.target as HTMLElement).innerHTML;
    if (filterValue === '' || None === 'None') {
      this.loadData();
    }
  }
  onSubmit() {
    const newFilterValue: UserSearch = {
      emailFilter:
        this.searchForm.value.emailFilter != null
          ? this.searchForm.value.emailFilter.trim()
          : this.searchForm.value.emailFilter,
      personalNumberFilter:
        this.searchForm.value.personalNumberFilter != null
          ? this.searchForm.value.personalNumberFilter.trim()
          : this.searchForm.value.personalNumberFilter,
      firstNameFilter:
        this.searchForm.value.firstNameFilter != null
          ? this.searchForm.value.firstNameFilter.trim()
          : this.searchForm.value.firstNameFilter,
      lastNameFilter:
        this.searchForm.value.lastNameFilter != null
          ? this.searchForm.value.lastNameFilter.trim()
          : this.searchForm.value.lastNameFilter,
      dateOfBirthStart: this.searchForm.value.dateOfBirthStart,
      dateOfBirthEnd: this.searchForm.value.dateOfBirthEnd,
      categoryIdFilter: this.searchForm.value.categoryIdFilter,
      statusIdFilter: this.searchForm.value.statusIdFilter,
    };

    if (JSON.stringify(newFilterValue) != JSON.stringify(this.searchFilter)) {
      this.filterPage = 0;
    }

    this.searchFilter = newFilterValue;

    this.usersService
      .filterUsers(this.filterPage, this.pageSize, this.searchFilter)
      .subscribe((res) => {
        this.dataSource.data = res.users;

        setTimeout(() => {
          this.paginator.pageIndex = this.filterPage;
          this.paginator.length = res.rowNumber;
          this.totalRows = res.rowNumber;
        });
      });
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe((res) => this.loadData());
  }
}

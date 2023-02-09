import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/modal/modal.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { TEXT_COLUMN_OPTIONS } from '@angular/cdk/table';
import { ChangeModalComponent } from '../change-modal/change-modal.component';
@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.css'],
})
export class CategoriesHomeComponent implements AfterViewInit {
  animal: string;
  name: string;
  filterValue: string;
  changedName: string;
  id: number;
  categories: Category[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  filterPage = 0;
  event: Event;
  pageSizeOptions: number[] = [5, 10];
  constructor(
    private dialogRef: MatDialog,
    private CategoryService: CategoriesService
  ) {}
  openDialog() {
    const dialogRef = this.dialogRef.open(ModalComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.animal = result;

        this.CategoryService.addCategory(this.animal).subscribe((res) => {});
        this.loadData();
        this.animal = '';
      }
    });
  }

  openDialogUpdate(id: number) {
    const dialogRef = this.dialogRef.open(ChangeModalComponent, {
      width: '250px',
      data: { id: this.id, changedName: this.changedName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.CategoryService.updateCategory(id, result).subscribe((res) => {
          this.loadData();
        });
      }
    });
  }

  displayedColumns: string[] = ['position', 'name', 'action'];

  dataSource: MatTableDataSource<Category> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.CategoryService.getAllCategories(
      this.currentPage,
      this.pageSize
    ).subscribe((res) => {
      this.dataSource.data = res.categories;
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
    if (this.filterValue != undefined) {
      this.applyFilter(this.event);

      return;
    }
    this.loadData();
  }

  applyFilter(event: Event) {
    this.event = event;
    const newFilterValue = (event.target as HTMLInputElement).value;

    if (this.filterValue != newFilterValue) {
      this.filterPage = 0;
    }

    this.filterValue = newFilterValue;
    const value = this.filterValue.trim().toLowerCase();

    if (this.filterValue != '') {
      this.CategoryService.filterCategories(
        this.filterPage,
        this.pageSize,
        value
      ).subscribe((res) => {
        this.dataSource.data = res.categories;
        setTimeout(() => {
          this.paginator.pageIndex = this.filterPage;
          this.paginator.length = res.rowNumber;
          this.totalRows = res.rowNumber;
        });
      });
    }
    if (this.filterValue === '') {
      this.loadData();
    }
  }

  deleteOne(id: number) {
    this.CategoryService.deleteCategory(id).subscribe((res) => {
      this.loadData();
    });
  }
}

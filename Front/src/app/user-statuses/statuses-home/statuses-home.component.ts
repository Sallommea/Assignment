import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Status } from 'src/app/models/status.model';
import { TEXT_COLUMN_OPTIONS } from '@angular/cdk/table';
import { StatusService } from 'src/app/services/status.service';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { UpdateModalComponent } from '../update-modal/update-modal.component';
@Component({
  selector: 'app-statuses-home',
  templateUrl: './statuses-home.component.html',
  styleUrls: ['./statuses-home.component.css'],
})
export class StatusesHomeComponent implements AfterViewInit {
  status: string;
  name: string;
  changedStatus: string;
  filterValue: string;
  id: number;
  statuses: Status[] = [];
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  filterPage = 0;
  event: Event;
  pageSizeOptions: number[] = [5, 10];

  constructor(
    private dialogRef: MatDialog,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  displayedColumns: string[] = ['position', 'name', 'action'];

  dataSource: MatTableDataSource<Status> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openDialog() {
    const dialogRef = this.dialogRef.open(AddModalComponent, {
      width: '250px',
      data: { status: this.status },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.status = result;
        this.statusService.addStatus(this.status).subscribe((res) => {});
        this.loadData();
        this.status = '';
      }
    });
  }

  openDialogUpdate(id: number) {
    const dialogRef = this.dialogRef.open(UpdateModalComponent, {
      width: '250px',
      data: { changedStatus: this.changedStatus },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.statusService.updateStatus(id, result).subscribe((res) => {
          this.loadData();
        });
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadData() {
    this.statusService
      .getAllStatus(this.currentPage, this.pageSize)
      .subscribe((res) => {
        this.dataSource.data = res.statuses;

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
    if (this.filterValue != '') {
      this.applyFilter(this.event);
      return;
    }
    this.loadData();
  }

  applyFilter(event: Event) {
    this.event = event;
    this.filterValue = (event.target as HTMLInputElement).value;
    const value = this.filterValue.trim().toLowerCase();
    if (this.filterValue != '') {
      this.statusService
        .filterStatus(this.currentPage, this.pageSize, value)
        .subscribe((res) => {
          this.dataSource.data = res.statuses;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = res.rowNumber;
            this.totalRows = res.rowNumber;
          });
        });
    }
    if (this.filterValue === '') {
      this.loadData();
    }
  }

  deleteStatus(id: number) {
    this.statusService.deleteStatus(id).subscribe((res) => {
      this.loadData();
    });
  }
}

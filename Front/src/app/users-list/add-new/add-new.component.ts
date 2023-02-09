import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';

import { CategoriesService } from 'src/app/services/categories.service';
import { StatusService } from 'src/app/services/status.service';
import { Category } from 'src/app/models/category.model';
import { Status } from 'src/app/models/status.model';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.css'],
})
export class AddNewComponent implements OnInit, OnDestroy {
  constructor(
    private categoryService: CategoriesService,
    private statusService: StatusService,
    private userService: UsersService,
    private router: Router
  ) {}
  categories: Category[] = [];
  status: Status[] = [];
  subs: Subscription[] = [];

  userForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(),
    personalNumber: new FormControl(),
    email: new FormControl(),
    dateOfBirth: new FormControl(),
    categoryId: new FormControl(),
    statusId: new FormControl(),
  });
  ngOnInit(): void {
    this.subs.push(
      this.categoryService.getAll().subscribe((res) => (this.categories = res))
    );
    this.subs.push(
      this.statusService.getAll().subscribe((res) => (this.status = res))
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((x) => x.unsubscribe());
  }
  onSubmit() {
    this.userService.addUser(this.userForm.value).subscribe((res) => {
      this.router.navigateByUrl('/usersList');
    });
  }
}

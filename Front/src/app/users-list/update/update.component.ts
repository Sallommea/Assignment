import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { StatusService } from 'src/app/services/status.service';

import { Category } from 'src/app/models/category.model';
import { User } from 'src/app/models/user.model';
import { Ussser } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Status } from 'src/app/models/status.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit {
  user: User;
  categories: Category[] = [];
  status: Status[] = [];
  userId: number;
  userForm: FormGroup;
  subs: Subscription[] = [];
  showForm = false;
  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoriesService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];

    this.usersService.getById(this.userId).subscribe((user) => {
      this.user = user;
      this.updateData(this.user);
    });
    this.categoryService.getAll().subscribe((res) => (this.categories = res));
    this.statusService.getAll().subscribe((res) => (this.status = res));
    this.showForm = !this.showForm;
  }
  updateData(user: User) {
    this.userForm = new FormGroup({
      firstName: new FormControl(user.firstName),
      lastName: new FormControl(user.lastName),
      personalNumber: new FormControl(user.personalNumber),
      email: new FormControl(user.email),
      dateOfBirth: new FormControl(user.dateOfBirth),
      categoryId: new FormControl(user.category.id),
      statusId: new FormControl(user.status.id),
    });
    console.log(user);
  }
  onSubmit() {
    const userUpdated: Ussser = {
      id: this.userId,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      personalNumber: this.userForm.value.personalNumber,
      email: this.userForm.value.email,
      dateOfBirth: this.userForm.value.dateOfBirth,
      categoryId: this.userForm.value.categoryId,
      statusId: this.userForm.value.statusId,
    };
    console.log(userUpdated);
    this.usersService.updateUser(userUpdated).subscribe((res) => {
      this.router.navigateByUrl('/usersList');
    });
  }
}

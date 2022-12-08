import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListHomeComponent } from './users-list-home.component';

describe('UsersListHomeComponent', () => {
  let component: UsersListHomeComponent;
  let fixture: ComponentFixture<UsersListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersListHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

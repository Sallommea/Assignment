import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusesHomeComponent } from './statuses-home.component';

describe('StatusesHomeComponent', () => {
  let component: StatusesHomeComponent;
  let fixture: ComponentFixture<StatusesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusesHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

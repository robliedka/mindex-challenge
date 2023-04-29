import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateDeleteDialogComponent } from './employee-update-delete-dialog.component';

describe('EmployeeUpdateDeleteDialogComponent', () => {
  let component: EmployeeUpdateDeleteDialogComponent;
  let fixture: ComponentFixture<EmployeeUpdateDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUpdateDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUpdateDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

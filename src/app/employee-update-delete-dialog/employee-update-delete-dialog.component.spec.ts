import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUpdateDeleteDialogComponent } from './employee-update-delete-dialog.component';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';


@Component({selector: 'app-mat-list', template: ''})
  class ListComponent {
}

@Component({selector: 'app-mat-list-item', template: ''})
  class ListItemComponent {
}

@Component({selector: 'app-mat-form-field', template: ''})
  class MatFormComponent {
}

const employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAll', 'get', 'save', 'remove']);
const matDialogServiceSpy = jasmine.createSpyObj<MatDialog>('MatDialog', ['open']);


describe('EmployeeUpdateDeleteDialogComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [ 
        EmployeeUpdateDeleteDialogComponent,
        ListComponent,
        ListItemComponent,
        MatFormComponent
      ],
      providers: [
        {provide: EmployeeService, useValue: employeeServiceSpy},
        {provide: MatDialog, useValue: matDialogServiceSpy},
      ],
    })
    .compileComponents();
  }));

  it('open dialog', () => {
    const dialog = EmployeeUpdateDeleteDialogComponent.openDialog(matDialogServiceSpy, null, false)
    expect(matDialogServiceSpy.open).toHaveBeenCalled();
  });
});

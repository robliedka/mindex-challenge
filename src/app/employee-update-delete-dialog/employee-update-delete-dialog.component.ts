import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../employee';
import { EmployeeForm } from '../employee-form';
import { EmployeeService } from '../employee.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-employee-update-delete-dialog',
  templateUrl: './employee-update-delete-dialog.component.html',
  styleUrls: ['./employee-update-delete-dialog.component.css']
})
export class EmployeeUpdateDeleteDialogComponent implements OnInit {
  private employee: Employee;
  public updating: boolean;

  public employeeForm = new EmployeeForm(new Employee());

  constructor(
    private dialogRef: MatDialogRef<EmployeeUpdateDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data : {
      employee: Employee,
      update: boolean
    }, 
    private employeeService: EmployeeService) {
      this.employee = data.employee;
      this.updating = data.update;
   }

  ngOnInit(): void {
    if(this.updating && !!this.employee){
      this.employeeForm = new EmployeeForm(this.employee);
    }
  }

  /**
   * Update the employee & close the dialog
   */
  public updateEmployee(): void{
    if(this.employeeForm.formGroup.dirty){
      if(!this.employeeForm.formGroup.valid){
        this.employeeForm.formGroup.markAllAsTouched();//Show validation errors
        //TODO: show an error message
      }

      this.employeeService.save(this.employeeForm.employee).pipe(take(1)).subscribe(_ => 
        this.dialogRef.close());
    }
  }

  /**
   * Open a dialog to either update or delete and employeed
   * @param dialog MaterialDialog 
   * @param employee The employee to update/delete
   * @param update Whether we are updating, false to delete
   * @returns reference to dialog
   */
  public static openDialog(dialog: MatDialog, employee: Employee, update: boolean): MatDialogRef<EmployeeUpdateDeleteDialogComponent>{
    return dialog.open(EmployeeUpdateDeleteDialogComponent, {
      data: {
        update: update,
        employee: employee
      }
    });
  }
}

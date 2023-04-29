import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  catchError,
  filter,
  map,
  mergeMap,
  reduce,
  startWith,
  take,
  takeUntil,
} from "rxjs/operators";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";

import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";
import { EmployeeUpdateDeleteDialogComponent } from "../employee-update-delete-dialog/employee-update-delete-dialog.component";
import { Subject } from "rxjs";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  errorMessage: string;

  private unsubscribe = new Subject();

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  /**
   * Get employee objects with ids matching the passed list
   * @param directReportIds An employees direct reports
   * @returns Array of employee objects matching passed id list
   **/
  public getEmployeeReports(directReportIds: number[]): Employee[] {
    if (!directReportIds?.length) {
      //handle null & empty list
      return [];
    }
    //Intersections of employees and directReports
    return this.employees.filter((e) =>
      directReportIds.some((dri) => dri === e.id)
    );
  }

  public deleteEmployee(employee: Employee): void {
    EmployeeUpdateDeleteDialogComponent.openDialog(this.dialog, employee, false)
      .afterClosed()
      .pipe(
        take(1), //Stop listing after close
        filter((confirmed) => !!confirmed), //Stop if they did not confirm
        mergeMap((_) => this.employeeService.remove(employee)) //Perform removal
        //TODO catchError & alert user
      )
      .subscribe(); //TODO: Confirm delete
  }

  /**
   * Open EmployeeUpdateDeleteDialogComponent to update an employee
   * @param employee Employee to update
   */
  public updateEmployee(employee: Employee): void {
    //Dialog will handle updating
    EmployeeUpdateDeleteDialogComponent.openDialog(this.dialog, employee, true);
  }

  ngOnInit(): void {
    this.employeeService.employeesChanged
      .pipe(
        startWith(null), //Fire initially
        mergeMap(_ => //Every time the change emits, reload
          this.employeeService.getAll().pipe(
            reduce((emps, e: Employee) => emps.concat(e), []),
            map((emps) => (this.employees = emps))
          )
        ),
        takeUntil(this.unsubscribe),
        catchError(this.handleError.bind(this))
      )
      .subscribe();
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return (this.errorMessage = e.message || "Unable to retrieve employees");
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

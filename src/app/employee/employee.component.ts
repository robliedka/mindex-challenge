import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Employee} from '../employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  @Input() employee: Employee;
  @Input() directReports: Employee[];

  @Output() deleteEmployee = new EventEmitter<Employee>()
  @Output() updateEmployee = new EventEmitter<Employee>();

  constructor() {
  }
}

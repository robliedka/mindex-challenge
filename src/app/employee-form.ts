import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Employee } from "./employee";

export class EmployeeForm{

    public formGroup = new FormGroup({
        compensation: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    constructor(public employee: Employee){
        this.formGroup.controls.compensation.patchValue(employee.compensation);
        this.formGroup.controls.compensation.valueChanges.subscribe(newComp => this.employee.compensation = newComp);
    }
}
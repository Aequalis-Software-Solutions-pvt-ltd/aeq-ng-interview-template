import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { Employee, Role } from '../employee-data';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent {
  employeeForm = new UntypedFormGroup({
    id: new FormControl(null,Validators.required),
    firstName: new FormControl(null,Validators.required),
    lastName: new FormControl(null,Validators.required),
    age: new FormControl(null,Validators.required),
    experience: new FormControl(null,Validators.required),
    role: new FormControl(null,Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<EmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {employee:Employee,options:{readonly:boolean}},
    private readonly fb: FormBuilder
  ) {
    if(data.employee as Employee){
      this.employeeForm.setValue({
        id: data.employee.id,
        firstName: data.employee.firstName,
        lastName: data.employee.lastName,
        age: data.employee.age,
        experience: data.employee.experience,
        role: data.employee.role
      });
    }
    if(data?.options?.readonly){
      this.employeeForm.disable();
    }else{
      this.employeeForm.enable();
    }
    
  }


  


  onSubmit(): void {
    this.dialogRef.close(this.employeeForm.value);
  }
  get roles(){
    return Object.values(Role);
  }
}

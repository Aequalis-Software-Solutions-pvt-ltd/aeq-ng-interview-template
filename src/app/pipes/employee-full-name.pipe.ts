import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../employee-data';

@Pipe({
  name: 'employeeFullName'
})
export class EmployeeFullNamePipe implements PipeTransform {

  transform(value: Employee): string {
    if (!value) {
      return '';
    }
    return `${value.firstName} ${value.lastName}`;
  }

}

import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, merge, BehaviorSubject } from 'rxjs';
import { Employee, employees } from '../employee-data';
import { mergeSort } from '../utils/merge-sort';


export enum Role {
  DEVELOPER = 'Developer',
  MANAGER = 'Manager',
  ANALYST = 'Analyst',
}

/**
 * Data source for the EmployeeList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmployeeListDataSource extends DataSource<Employee> {
  ssaveEmployee(employee: Employee) {
    throw new Error('Method not implemented.');
  }
  data: Employee[] = employees;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  employeeDataSubject = new BehaviorSubject(employees);

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Employee[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(this.employeeDataSubject.asObservable(), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }
  set employees(employees:Employee[]){
    this.data = employees;
    this.employeeDataSubject.next(employees);
  }
  get employees(){
    return this.data;
  }
  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Employee[]): Employee[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Employee[]): Employee[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    const isAsc = this.sort?.direction === 'asc';
    return mergeSort(data,isAsc,this.sort.active as keyof Employee);
  }
  deleteEmployee(id:string | undefined){
    this.employees = this.data.filter(item=> item.id !== id);
  }
  saveEmployee(employee:Employee){
    const existingEmployee = this.data.find(emp=> emp.id === employee.id);
    if(existingEmployee) this.employees = this.data.map(d=> d.id === employee.id ? employee: d);
    else this.employees.push(employee);
  }
}


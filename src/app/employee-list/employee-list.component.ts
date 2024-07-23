import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { EmployeeListDataSource } from './employee-list-datasource';
import { Employee } from '../employee-data';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Employee>;
  dataSource: EmployeeListDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'age', 'experience', 'role', 'action'];

  constructor(public dialog: MatDialog) {

    this.dataSource = new EmployeeListDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  viewEmployee(employee: Employee) {
    this.openEmployeeDialog(employee, { readonly: true });
  }
  editEmployee(employee: Employee) {
    this.openEmployeeDialog(employee);
  }
  addEmployee() {
    this.openEmployeeDialog();
  }
  deleteEmployee(employee: Employee) {
    if (!confirm('Are you sure ?')) return;
    this.dataSource.deleteEmployee(employee.id);
  }
  openEmployeeDialog(employee?: Employee, options?: { readonly: boolean }) {
    const dialogRef = this.dialog.open(EmployeeComponent, { data: { employee, options }, });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveEmployee(result);
    });
  }
  saveEmployee(employee: Employee) {
    this.dataSource.saveEmployee(employee);
  }
}

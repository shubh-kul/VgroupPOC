import { Component, OnInit, OnDestroy } from '@angular/core';
import { MessageComponent } from '../../message/message.component';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public componentDestroyed$ = new Subject();
  public employeeList = [];
  public displayedEmployeeListColumns: string[] = ['employee_id', 'employee_name', 'salary', 'age', 'action'];

  constructor(public apiService: ApiService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchAllEmployeeList();
  }

  // Fetch All employees.
  public fetchAllEmployeeList(): void {
    this.apiService.isLoading = true;
    this.apiService.getAllEmployeeList()
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (data: any) => {
          this.apiService.isLoading = false;
          this.employeeList = data.data;
        },
        (error: HttpErrorResponse) => {
          this.apiService.isLoading = false;
          this.snackBar.openFromComponent(MessageComponent, {
            duration: ((0.5 * error.message.split(' ').length) + 1) * 1000,
            data: error.message,
          });
        });
  }

  // On edit particular employee with the help of id.
  public onEditSelectedEmployee(id: string, value: string, name: string, salary: string, age: string): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, { data: { value, name, salary, age, id } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // Create new employee.
  public onCreateNewEmployee(value: string): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, { data: { value } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  // Delete particular employee by id.
  public onDeleteSelectedEmployee(id: string): void {
    this.apiService.isLoading = true;
    this.apiService.deleteSelectedEmployee(id)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (data: any) => {
          this.apiService.isLoading = false;
          this.snackBar.openFromComponent(MessageComponent, {
            duration: ((0.5 * data.message.split(' ').length) + 1) * 1000,
            data: data.message,
          });
          this.employeeList.forEach((item, index) => {
            if (item.id === id) {
              this.employeeList.splice(index, 1);
            }
          });
          // this.fetchAllEmployeeList();
        },
        (error: HttpErrorResponse) => {
          this.apiService.isLoading = false;
          this.snackBar.openFromComponent(MessageComponent, {
            duration: ((0.5 * error.error.message.split(' ').length) + 1) * 1000,
            data: error.message,
          });
        });
  }

  // Life cycle hook used to destroy subscription.
  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}

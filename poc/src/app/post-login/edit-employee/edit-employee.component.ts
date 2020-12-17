import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MessageComponent } from '../../message/message.component';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  public employeeDetailsForm: FormGroup;
  public componentDestroyed$ = new Subject();
  public isSubmitted = false;

  constructor(public dialogRef: MatDialogRef<EditEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              public apiService: ApiService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.employeeDetailsForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
    });
    if (this.data.value === 'edit') {
      this.employeeDetailsForm.controls.name.patchValue(this.data.name);
      this.employeeDetailsForm.controls.salary.patchValue(this.data.salary);
      this.employeeDetailsForm.controls.age.patchValue(this.data.age);
    }
  }

  get f() { return this.employeeDetailsForm.controls; }

  // Employee creation API.
  public createEmployeeDetails(): void {
    this.isSubmitted = true;
    if (this.employeeDetailsForm.invalid) {
      return;
    }
    this.apiService.createNewEmployee(this.employeeDetailsForm.value)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(
      (data: any) => {
        this.apiService.isLoading = false;
        this.snackBar.openFromComponent(MessageComponent, {
          duration: ((0.5 * data.message.split(' ').length) + 1) * 1000,
          data: data.message,
        });
        this.dialogRef.close(this.employeeDetailsForm.value);
      },
      (error: HttpErrorResponse) => {
        this.apiService.isLoading = false;
        this.snackBar.openFromComponent(MessageComponent, {
          duration: ((0.5 * error.message.split(' ').length) + 1) * 1000,
          data: error.message,
        });
      });
  }

  // Employee upation API.
  public updateEmployeeDetails(): void {
    this.isSubmitted = true;
    if (this.employeeDetailsForm.invalid) {
      return;
    }
    this.apiService.editSelectedEmployee(this.employeeDetailsForm.value, this.data.id)
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe(
      (data: any) => {
        this.apiService.isLoading = false;
        this.snackBar.openFromComponent(MessageComponent, {
          duration: ((0.5 * data.message.split(' ').length) + 1) * 1000,
          data: data.message,
        });
        this.dialogRef.close(this.employeeDetailsForm.value);
      },
      (error: HttpErrorResponse) => {
        this.apiService.isLoading = false;
        this.snackBar.openFromComponent(MessageComponent, {
          duration: ((0.5 * error.message.split(' ').length) + 1) * 1000,
          data: error.message,
        });
      });
  }

}

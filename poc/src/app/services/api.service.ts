import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeData } from '../interface';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLoading: boolean;

  constructor(private httpClient: HttpClient) { }

  // Fetch all employee details.
  public getAllEmployeeList(): Observable<EmployeeData> {
    return this.httpClient.get<EmployeeData>(`${environment.apiUrl}/employees`)
      .pipe(map(employee => {
        return employee;
      }));
  }

  // Delete employee by id.
  public deleteSelectedEmployee(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/delete/${id}`)
      .pipe(map(employee => {
        return employee;
      }));
  }

  // Update emplloyee details by id.
  public editSelectedEmployee(selectedEmployee: any, id: string): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/update/${id}`, selectedEmployee)
      .pipe(map(employee => {
        return employee;
      }));
  }

  // Create new employee.
  public createNewEmployee(newlyCreatedEmployee: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/create`, newlyCreatedEmployee)
      .pipe(map(employee => {
        return employee;
      }));
  }
}

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {from, Observable, Subject, throwError} from 'rxjs';
import {catchError, flatMap, tap} from 'rxjs/operators';

import {Employee} from './employee';

@Injectable()
export class EmployeeService {
  private url = '/api/employees';
  public employeesChanged = new Subject<void>(); 

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Employee> {
    return this.http.get<Employee[]>(this.url)
      .pipe(
        flatMap(emps => from(emps)),
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  save(emp: Employee): Observable<Employee> {
    const response = (!!emp.id) ? this.put(emp) : this.post(emp);
    return response.pipe(tap(_ => this.employeesChanged.next()), catchError(this.handleError));
  }

  remove(emp: Employee): Observable<never> {
    return this.http
      .delete<never>(`${this.url}/${emp.id}`)
      .pipe(tap(_ => this.employeesChanged.next()),
          catchError(this.handleError));
  }

  private post(emp: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.url, emp);
  }

  private put(emp: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/${emp.id}`, emp);
  }

  private handleError(res: HttpErrorResponse | any): Observable<never> {
    return throwError(res.error || 'Server error');
  }
}

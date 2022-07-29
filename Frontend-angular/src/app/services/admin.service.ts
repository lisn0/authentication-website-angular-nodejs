import { Injectable } from '@angular/core';
import { UserModel } from '../models/user';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  REST_API: string = '/api/users';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}
  // Add
  AddUser(data: UserModel): Observable<any> {
    let API_URL = `${this.REST_API}/add`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }
  // Get all objects
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}/list`);
  }
  // Get single object
  GetUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/show/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  GetUserByUsername(username: any): Observable<any> {
    let API_URL = `${this.REST_API}/showByUsername/${username}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }
  // Update
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  blockUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/blockuser/${id}`;
    return this.httpClient
      .put(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  deblockUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/deblockuser/${id}`;
    return this.httpClient
      .put(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}

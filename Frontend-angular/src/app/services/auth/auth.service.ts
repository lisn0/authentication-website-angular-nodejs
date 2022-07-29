import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import jwt_decode from "jwt-decode";
import {catchError} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http : HttpClient) { }

  public isAuthenticated() : Boolean {
    let token = localStorage.getItem('id_token')
    if(token && JSON.parse(token)){
      return true;
    }
    return false;
  }
  public isLoggedIn() {
    if (this.tokenExpired()) {
      return false
    } else {
      return true
    }  }
  tokenExpired() {
    let t = localStorage.getItem("id_token");

    if (t){
      let expiry = (JSON.parse(atob(t.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    else {
      return true
    }
  }

  public setUserInfo(token: { token: Object; }){
    var t = JSON.stringify(token.token)
    const expiresAt = (JSON.parse(atob(t.split('.')[1]))).exp;
    let decoded = jwt_decode(t);
    // @ts-ignore
    let username = decoded['username']
    localStorage.setItem('username', username);
    localStorage.setItem('id_token', t);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  public deleteUserInfo(){
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("username");
  }
  public getUser(){
    return localStorage.getItem("username");
  }

  GetUsers() {
    return this.http.get(`/api/users/list`);
  }

  // @ts-ignore
  // public validate(username, password) {
  //   return this.http.post('/api/users/login', {'username' : username, 'password' : password}).toPromise()
  // }

  // @ts-ignore
  register(email, username, password) {
    return this.http.post('/api/users/register', {'username' : username, 'email': email, 'password' : password}).toPromise()
  }

  updateUser( username: any, data: any) {
    // return this.http.put('/api/updatebyusername', {'username' : username, 'firstname': firstname, 'lastname' : lastname}).toPromise()
    let API_URL = `/api/users/updatebyusername/${username}`;
    return this.http
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  validate( username: any, password: any) {
    let API_URL = `/api/users/login/`;
    return this.http
      .post(API_URL, {'username' : username, 'password' : password}, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // @ts-ignore
  forgotPassword(email) {
    return this.http.post('/api/users/forgot',{'email' : email}).toPromise()
  }

  // @ts-ignore
  resetPassword(token, password) {
    return this.http.post('/api/users/reset/'+ token, {password: password}).toPromise()
  }

  google() {
    return this.http.get('/api/users/auth/google').toPromise()
  }

  logout() {
    this.deleteUserInfo();
    return this.http.get('/api/users/logout').toPromise();
  }

  // @ts-ignore
  validateJwt(token) {
    return this.http.post('/api/users/loginjwt', {'token' : token}).toPromise()

  }
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



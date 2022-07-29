import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EventModel} from "../../models/event";
import {UserModel} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAllUsers(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>('http://localhost:3000/users/list');
  }
}

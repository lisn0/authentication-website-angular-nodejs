import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivate implements CanActivate {

  constructor(private authService : AuthService, private route : Router) {

  }

  canActivate(){
    if (!this.authService.isLoggedIn()) {
      return true;
    }
    this.route.navigate(['home']);
    return false;

  }
}


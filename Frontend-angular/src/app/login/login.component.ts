import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserModel} from "../models/user";
import jwt_decode from 'jwt-decode';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user= new UserModel();
  userName! : String;
  userPassword! : String;

  constructor(private toastr: ToastrService,private authService: AuthService, private router : Router, private route : ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.queryParams){
      this.jwtlogin(this.route.snapshot.queryParams['token'])
    }
  }


  // @ts-ignore
  jwtlogin(token){
    this.authService.validateJwt(token)
      .then((response) => {
        let decoded = jwt_decode(token);
        // @ts-ignore
        this.user.username = decoded['username']
        // @ts-ignore
        this.user.email = decoded['email']
        this.authService.setUserInfo({'token' : response ? response : ['token']});
        this.router.navigate(['home']);
      })
  }

  login(){

    // this.authService.validate(this.userName, this.userPassword)
    // .then((response) => {
    //   console.log("user login")
    //   console.log(response)
    //   this.router.navigate(['home']);
    // })

    this.authService.validate(this.userName, this.userPassword)
      .subscribe((response) => {
        this.toastr.success('login successful', 'Success');
        console.log(response)
        this.authService.setUserInfo({'token' : response ? response : ['token']});
        this.router.navigate(['home']);
        // this.ngZone.run(() => this.router.navigateByUrl('/home'))
      }, (err) => {
        this.toastr.error("user cannot login", "Error");
        console.log(err);
      });

  }



}

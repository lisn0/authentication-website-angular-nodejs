import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  token = ""
  tokenForm = this.fb.group({
    password: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder,private route : ActivatedRoute,private router : Router) { }
  password! : String;

  ngOnInit(): void {
    if (this.route.snapshot.queryParams){
      this.token = this.route.snapshot.queryParams['token'];
    }

  }
  onSubmit() {
    console.warn(this.password);
    this.authService.resetPassword(this.token, this.password)
      .then((response) => {
        console.log('reset password')
        console.log(response)
        this.router.navigate(['login']);
      })
  }

}

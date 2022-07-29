import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email! : String;

  forgotForm = this.fb.group({
    email: ['', Validators.required],
  });

  constructor(private authService: AuthService, private fb: FormBuilder,    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn(this.email);
    this.authService.forgotPassword(this.email)
      .then((response) => {
        // @ts-ignore
        this.toastr.success(response.toString(), 'Success');
        console.log('forgot password')
        console.log(response)
      })
  }

}

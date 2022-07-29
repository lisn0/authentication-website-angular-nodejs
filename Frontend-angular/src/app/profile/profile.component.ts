  import {Component, NgZone, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
  import {AdminService} from "../services/admin.service";
  import {Router} from "@angular/router";
  import { ToastrService } from 'ngx-toastr';

  @Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  profileForm: FormGroup;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private fb: FormBuilder,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.currentUser = this.authService.getUser();
    console.log("here");
    console.log(this.currentUser);
    this.adminService.GetUserByUsername(this.currentUser).subscribe(res => {
      this.profileForm.setValue({
        firstName: res['firstName'],
        lastName: res['lastName'],
        address: res['address'],
        phoneNumber: res['phoneNumber'],
        email: res['email']
      });
    });
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      email: [''],
      phoneNumber: ['']
    })

  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

  }

  onSubmit() {
    console.warn(this.profileForm.value);

    this.authService.updateUser(this.currentUser, this.profileForm.value)
      .subscribe(() => {
        this.toastr.success('Data updated successfully', 'Success');

        // this.ngZone.run(() => this.router.navigateByUrl('/home'))
      }, (err) => {
        console.log(err);
      });

  }

}

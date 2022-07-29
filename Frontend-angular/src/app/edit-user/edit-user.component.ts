import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import {AdminService} from "../services/admin.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private toastr: ToastrService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.GetUser(this.getId).subscribe(res => {
      this.updateForm.setValue({
        firstName: res['firstName'],
        lastName: res['lastName'],
        address: res['address'],
        phoneNumber: res['phoneNumber'],
        email: res['email']
      });
    });
    this.updateForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      email: [''],
      phoneNumber: ['']
    })
  }
  ngOnInit() { }
  onUpdate(): any {
    this.adminService.updateUser(this.getId, this.updateForm.value)
      .subscribe(() => {
        console.log('Data updated successfully!')
        this.toastr.success("user data has benn updated", 'Success');

        this.ngZone.run(() => this.router.navigateByUrl('/admin'))
      }, (err) => {
        console.log(err);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import {AdminService} from "../services/admin.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  Users:any = [];
  constructor(private router: Router,private adminService: AdminService,    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.adminService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    });
  }
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.adminService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
        this.toastr.success("user has benn deleted", 'Success');
        this.router.navigateByUrl('/admin');
      })
    }
  }
  block(id:any) {
    console.log(id);
    if(window.confirm('Do you want to block the user?')) {
      this.adminService.blockUser(id).subscribe((res) => {
        this.toastr.success("user is now blocked", 'Success');
        this.router.navigateByUrl('/admin');

        console.log(res)
      })
    }
  }
  deblock(id:any) {
    console.log(id);
    if(window.confirm('Do you want to deblock the user?')) {
      this.adminService.deblockUser(id).subscribe((res) => {
        this.toastr.success("user is now unblocked", 'Success');
        console.log(res);
        this.router.navigateByUrl('/admin');

      })
    }
  }
}

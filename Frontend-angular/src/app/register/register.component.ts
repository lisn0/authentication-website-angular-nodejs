import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userEmail!: String;
  userPassword!: String;
  userName!: String;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  register(){
    this.authService.register(this.userEmail, this.userName, this.userPassword)
      .then((response) => {
        if (response) {
          this.authService.setUserInfo({'token': response ? response : ['token']});
        }
        this.router.navigate(['home']);
      })
  }

}

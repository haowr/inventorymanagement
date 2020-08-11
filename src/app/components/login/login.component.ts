import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',

  templateUrl: './login.component.html',
  styles: [

  ],

  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "";
  password: string = "";
  userName: string;
  errorMsg: String;
  successfulLoginMsg: string = "Login Successful...";
  unSuccessfulLoginMsg: string = "Login Unsuccessful...";
  userNameCannotBeEmptyMsg: string = "Username Cannot Be Empty..."
  passwordCannotBeEmptyMsg: string = "Password Cannot Be Empty..."

  successfulLogin: boolean = false;
  unSuccessfulLogin: boolean = false;
  userNameCannotBeEmpty: boolean = false;
  passwordCannotBeEmpty: boolean = false;
  loadingLogin: boolean = false;

  constructor(private authservice: AuthService, private router: Router) { }

  ngOnInit() {

  }

  onLoginSubmit() {

    const user = {
      username: this.username,
      password: this.password


    }

    if (this.username == "") {
      this.loadingLogin = false;
      this.userNameCannotBeEmpty = true;
      setTimeout(() => {


        this.userNameCannotBeEmpty = false;

      }, 2000);

    }
    if (this.password == "") {
      this.loadingLogin = false;
      this.passwordCannotBeEmpty = true;
      setTimeout(() => {

        this.passwordCannotBeEmpty = false;

      }, 2000)

    }

    if (this.password !== "" && this.username !== "") {
      this.loadingLogin = true;


      this.authservice.authenticateUser(user).subscribe(data => {

        if (data.success) {
          this.loadingLogin = false;
          this.successfulLogin = true;
          this.authservice.storeUserData(data.token, user);
          this.authservice.updateGlobalUsername(data.name);
          this.userName = this.authservice.userName
          this.authservice.storeUsername();

          setTimeout(() => {

            this.successfulLogin = false;


          }, 2000);
          setTimeout(() => {

            this.router.navigate(['/clients']);


          }, 3000);

        } else {

          this.loadingLogin = false;
          this.errorMsg = data.message;
          this.unSuccessfulLogin = true;

          setTimeout(() => {

            this.unSuccessfulLogin = false;


          }, 3000);


        }

      })

    }

  }

}

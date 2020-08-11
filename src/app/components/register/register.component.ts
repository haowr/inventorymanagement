import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service'
//import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = "";
  username: string = "";
  email: string = "";
  password: string = "";
  errorMessage: string = "";
  passwordCannotBeEmptyMsg: string = "Password Field Cannot Be Empty...";
  emailCannotBeEmptyMsg: string = "Email Field Cannot Be Empty...";
  usernameCannotBeEmptyMsg: string = "Username Field Cannot Be Empty...";
  nameCannotBeEmptyMsg: string = "Name Field Cannot Be Empty...";
  unSuccessfulRegistrationMsg: string = "Registration Unsuccessful..."
  successfulRegistrationMsg: string = "Registration Successful"
  invalidEmailMsg: string = "Invalid Email...";
  
  nameCannotBeEmpty: boolean = false;
  emailCannotBeEmpty: boolean = false;
  usernameCannotBeEmpty: boolean = false;
  passwordCannotBeEmpty: boolean = false;
  loadingRegistration: boolean = false;
  validEmail: boolean = false;
  invalidEmail: boolean = false;
  registrationFailed: boolean = false;
  registrationSuccess: boolean = false;


  constructor(private validateservice: ValidateService,
    private authservice: AuthService, private router: Router) { }

  ngOnInit() {


  }
  onRegisterSubmit() {
    const user = {

      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      userType: "User"

    }

    if (this.name == "") {

      this.nameCannotBeEmpty = true;
      setTimeout(() => {

        this.nameCannotBeEmpty = false;

      }, 2000);

    }
    if (this.email == "") {

      this.emailCannotBeEmpty = true;
      setTimeout(() => {

        this.emailCannotBeEmpty = false;

      }, 2000);
    }
    if (this.username == "") {
      this.usernameCannotBeEmpty = true;
      setTimeout(() => {

        this.usernameCannotBeEmpty = false;

      }, 2000);

    }
    if (this.password == "") {

      this.passwordCannotBeEmpty = true;
      setTimeout(() => {

        this.passwordCannotBeEmpty = false;

      }, 2000);
    }
    if (!this.validateservice.validateEmail(user.email)) {
      //this.flashmessages.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      this.invalidEmail = true;
      setTimeout(() => {

        this.invalidEmail = false;
      }, 2000)
      //return false;
    } else {
      this.validEmail = true;
    }

    if (this.name !== "" &&
      this.email !== "" &&
      this.password !== "" &&
      this.username !== "" &&
      this.validEmail) {


      this.loadingRegistration = true;
      // Register user
      this.authservice.registerUser(user).subscribe(data => {
        if (data.success) {
          // this.flashmessages.show('You are now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
          this.loadingRegistration = false;
          this.registrationSuccess = true;
          setTimeout(() => {

            this.registrationSuccess = false;
            this.router.navigate(['/login']);

          }, 2000)

        } else {

          this.loadingRegistration = false;
          this.registrationFailed = true;

          if (data.err.code == 11000) {


            this.errorMessage = "User Already Exists";

          } else {

            this.errorMessage = "Registration Failed";
          }
          setTimeout(() => {

            this.registrationFailed = false;
            this.name = "";
            this.email = "";
            this.password = "";
            this.username = "";

          }, 2000)

        }
      });
    }
    // Required Fields
    if (!this.validateservice.validateRegister(user)) {

      return false;

    }

    // Validate Email
    if (!this.validateservice.validateEmail(user.email)) {

      return false;

    }

  }
}
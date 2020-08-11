import { Component, OnInit } from '@angular/core';
//import { WeatherService } from '../../../services/weather.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class HomeComponent2 implements OnInit {
  name:string;
  age:number;
  temperatureNow:string="";
  weatherNow:string="";
     largeRoseLogoHome :boolean = false;
     largestRoseLogoHome:boolean = false;
    smallestRoseLogoHome:boolean = false;


  
  constructor( public authservice:AuthService, private router: Router) {

    

   }
  onLogoutClick(){

if(document.documentElement.clientWidth < 768){

         //document.getElementById('navbar-toggle').click();

}
    this.authservice.logOut();
    console.log("pressed")
    //this.logOutSuccessful = true;
    //document.getElementById("navbar-toggle").click();

    
    
    setTimeout(()=>{
//this.username="";
      //this.logOutSuccessful = false;
       this.router.navigate(['/']);   
    return false;

    },500);
    //this.flashmessage.show("You are now logged out..",{cssClass: 'alert-success',timeout: 5000});
   

  }
    closeDropdown() {
    console.log("pressed")

    if (document.documentElement.clientWidth > 768) {
      console.log("fist condition")
      this.largeRoseLogoHome = true;
      this.largestRoseLogoHome = false;
      this.smallestRoseLogoHome = false;

    } else {

      document.getElementById('navbar-toggle').click();
      setTimeout(() => {



      }, 500)
    }

  }

  ngOnInit() {
    this.name = 'ROSE';
        
    this.authservice.checkIfLoggedIn();

  }

}

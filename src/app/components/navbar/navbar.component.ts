import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
//import { FlashMessagesService} from 'angular2-flash-messages';
import { Routes, Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../../services/data.service";
import { WeatherService } from '../../services/weather.service'
import { ClientService } from "../../services/client.service";
import { ChangeDetectorRef } from '@angular/core';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})



export class NavbarComponent implements OnInit {


  innerWidth: number;
  weatherNow: string = "";
  weatherDescription: string = "";
  temperatureHigh: string = "";
  temperatureLow: string = "";
  temperatureNow: string = ""
  logoutSuccessMsg: string = "You Have Been Succcessfully Logged Out...";
  userName: string;
  userType:string;
  username: any;
  location: string;
  userObject:object = {};
  pendingRequest: boolean = false;
  logOutSuccessful: boolean = false;
  loggedIn: boolean = true;
  smallestRoseLogo: boolean = false;
  largeRoseLogo: boolean = false;
  largestRoseLogo: boolean = false;
  weatherInfoDesktop: boolean = false;
  weatherInfo2: boolean = false;
  weatherInfoHidden: boolean = false;
  weatherInfo3Hidden: boolean = true;
  brandMobile: boolean = false;
  brandMobileIphoneX: boolean = false;
  brandFullScreen: boolean = true;
  brandMobileLandScape: boolean = false;
  brandMobileLandScapeIphoneX: boolean = false;
  removeBrand: boolean = false;
  divUnderlineOpen: boolean = false;
  removeWeatherQuickly: boolean = false;
  removeDesktopWeatherInfo: boolean = false;

  subcontractorObject: Object;
  inventory: Object[];
  subContractorArray: Object[];
  arrayOfOrderedItems: Number[];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 766) {

      this.brandMobile = true;
      this.brandFullScreen = false;
      this.brandMobileIphoneX = false;
      this.brandMobileLandScape = false;
      this.brandMobileLandScapeIphoneX = false;
      this.removeBrand = false;


      if (!this.largestRoseLogo) {
        this.smallestRoseLogo = true;
      }


      if (this.removeDesktopWeatherInfo && !this.removeWeatherQuickly && !this.divUnderlineOpen && !this.weatherInfo2) {

        this.removeDesktopWeatherInfo = true;
        this.removeWeatherQuickly = false;;
        this.divUnderlineOpen = false;
        this.weatherInfo2 = false;

      }

      this.removeDesktopWeatherInfo = true;

    }
    if (this.innerWidth > 766 && this.innerWidth < 1080) {


      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = false;
      this.smallestRoseLogo = false;
      this.largeRoseLogo = true;


    }
    if (document.documentElement.clientWidth < 776 && document.documentElement.clientWidth > 375 && document.documentElement.clientWidth != 667) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.brandMobileIphoneX = false;
      this.removeBrand = false;
      this.brandMobileLandScape = true;


    }

    if (document.documentElement.clientWidth == 667) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = false;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = false;
      this.brandMobileLandScapeIphoneX = true;
      this.brandMobileLandScape = false;

    }

    if (this.innerWidth == 375) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = false;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = true;
      this.brandMobileLandScape = false;
      this.brandMobileLandScapeIphoneX = false;

    }
    if (document.documentElement.clientWidth == 360) {

      this.smallestRoseLogo = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobile = true;
      this.brandFullScreen = false;
      this.removeBrand = false;
      this.brandMobileIphoneX = false;


    }
    if (this.innerWidth < 320) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = false;

    }
    if (this.innerWidth > 1080) {

      this.brandFullScreen = true;
      this.brandMobile = false;
      this.brandMobileIphoneX = false
      this.largeRoseLogo = true;
      this.removeBrand = false;
      this.removeWeatherQuickly = false;
      this.weatherInfo2 = false;
      this.divUnderlineOpen = false;
      this.smallestRoseLogo = false;

    }

  }

  constructor(public authservice: AuthService,

    private router: Router,
    private dataservice: DataService,
    private clientservice: ClientService,
    private activatedroute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private weatherservice: WeatherService) { }


  ngOnInit() {
    if(localStorage.getItem('user') && localStorage.getItem('id_token')){


      this.userObject = JSON.parse(localStorage.getItem('user'));


    }



    this.weatherservice.getWeather().subscribe(data => {

      this.weatherNow = data.weather[0].icon;
      console.log(this.weatherNow)
      this.temperatureNow = data.main.temp;
      this.temperatureHigh = data.main.temp_max;
      this.temperatureLow = data.main.temp_min;
      this.weatherDescription = data.weather[0].description;

    })

    this.username = this.authservice.userName;
    this.authservice.userSubscribable.subscribe(value => {

      this.username = value;
      console.log("Value "+value)
     

    });
    this.authservice.userTypeSubscribable.subscribe(value=>{

console.log("Value "+value)
    this.userType = value;


    })


    if (document.documentElement.clientWidth > 1080) { //

      this.brandFullScreen = true;
      this.brandMobile = false;
      this.brandMobileIphoneX = false;
      this.removeBrand = false;
      this.largeRoseLogo = true;
      this.smallestRoseLogo = false;
      this.removeWeatherQuickly = false;
      this.weatherInfo2 = false;
      this.divUnderlineOpen = false;

    }

    if (document.documentElement.clientWidth > 766 && document.documentElement.clientWidth < 1080) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = false;
      this.smallestRoseLogo = false;
      this.largeRoseLogo = true;

    }
    if (document.documentElement.clientWidth < 766 && document.documentElement.clientWidth != 667) {

      this.smallestRoseLogo = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobile = true;
      this.brandFullScreen = false;
      this.removeBrand = false;


    }
    if (document.documentElement.clientWidth == 360) {

      this.smallestRoseLogo = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobile = true;
      this.brandFullScreen = false;
      this.removeBrand = false;
      this.brandMobileIphoneX = false;

    }

    if (document.documentElement.clientWidth < 776 && document.documentElement.clientWidth > 375 && document.documentElement.clientWidth != 667) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.brandMobileIphoneX = false;
      this.brandMobileLandScape = true;

    }

    if (document.documentElement.clientWidth == 375) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = false;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = true;
      this.brandMobileLandScapeIphoneX = false;
      this.brandMobileLandScape = false;

    }
    if (document.documentElement.clientWidth == 667) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = false;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = false;
      this.brandMobileLandScapeIphoneX = true;
      this.brandMobileLandScape = false;

    }
    if (document.documentElement.clientWidth < 320) {

      this.brandMobile = false;
      this.brandFullScreen = false;
      this.removeBrand = true;
      this.removeDesktopWeatherInfo = true;
      this.brandMobileIphoneX = false;

    }

    else {
      
      if (this.brandMobileLandScape) {
        this.brandMobile = false;
        this.brandFullScreen = false;
        this.removeBrand = false;
        this.largeRoseLogo = true;
        this.removeDesktopWeatherInfo = true;

      } else if (this.brandMobileLandScapeIphoneX) {

        this.brandMobile = false;
        this.brandFullScreen = false;
        this.removeBrand = false;
        this.largeRoseLogo = true;
        this.removeDesktopWeatherInfo = true;

      } else if (document.documentElement.clientWidth > 1080) {

        this.brandMobile = false;
        this.brandFullScreen = true;
        this.removeBrand = false;
        this.largeRoseLogo = true;
        this.removeDesktopWeatherInfo = false;

      }
      else {

        this.brandMobile = true;
        this.brandFullScreen = false;
        this.removeBrand = false;
        this.largeRoseLogo = true;
        this.removeDesktopWeatherInfo = true;

      }

    }


    this.authservice.checkIfLoggedIn();
    
    console.log(this.authservice.loggedIn())
    this.activatedroute.params.subscribe((params: Params) => {


      this.location = this.router.url.slice(16, this.router.url.length);

      this.userName = this.authservice.userName;
      this.authservice.loadToken();

      if (this.authservice.authToken) {

        this.loggedIn = true;

      } else {

        this.loggedIn = false;

      }

    })


  }
  closeWeatherInfo() {

    this.weatherInfo2 = false;
    this.divUnderlineOpen = false;
    this.weatherInfo3Hidden = true;
    this.weatherInfoHidden = false;


  }
  openWeatherInfo() {

    if (!this.weatherInfoDesktop && document.documentElement.clientWidth > 768) {

      this.removeDesktopWeatherInfo = false;
      this.weatherInfoDesktop = true;

    }
    else {

      this.weatherInfoDesktop = false;

    }

    if (!this.weatherInfo2 && document.documentElement.clientWidth < 768) {

      this.weatherInfo2 = true
      this.divUnderlineOpen = true;
      this.weatherInfo3Hidden = false;
      this.weatherInfoHidden = false;

    } else {

      this.weatherInfo2 = false;
      this.divUnderlineOpen = false;
      this.weatherInfo3Hidden = true;
      this.weatherInfoHidden = false;

    }
  }

  ngAfterViewInit() {

    this.cdRef.detectChanges();

    if (document.documentElement.clientWidth < 766) {

    }

  }
  closeNavbar() {

    if (document.documentElement.clientWidth < 766) {

      document.getElementById("navbar-toggle").click();

    }


  }
  loadLargeRoseLogo() {

    if (document.documentElement.clientWidth < 766) {

      this.removeWeatherQuickly = true;

      if (!this.largestRoseLogo) {

        this.largestRoseLogo = true;
        this.smallestRoseLogo = false;
       // console.log("here1")

      } 
      else if(this.largestRoseLogo && this.smallestRoseLogo == false){

        this.removeWeatherQuickly = false;
        this.weatherInfo2 = false;
        this.divUnderlineOpen = false;
        this.weatherInfo3Hidden = true;
        this.weatherInfoHidden = false;
        //console.log("here")

        setTimeout(() => {

          this.largestRoseLogo = false;
          this.smallestRoseLogo = true;

        }, 300)
      }
 


    } else {
   // console.log("final condition")
      this.smallestRoseLogo = true;
      this.largeRoseLogo = false;

    }

  }
  onLogoutClick() {


    this.authservice.logOut();

    if (document.documentElement.clientWidth < 768) {

      document.getElementById('navbar-toggle').click();

    }

    this.username = "";
    this.router.navigate(['/']);

  }

  closeDropdown() {


    if (document.documentElement.clientWidth > 768) {

      this.largeRoseLogo = true;
      this.largestRoseLogo = false;
      this.smallestRoseLogo = false;

    } else {

      document.getElementById('navbar-toggle').click();

      setTimeout(() => {



      }, 500)
    }

  }


}

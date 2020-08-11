import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router'

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(public authservice:AuthService, private router: Router){}
  canActivate(
   ) {
        let userObject = JSON.parse(localStorage.getItem('user'))
  console.log(userObject)
    if(this.authservice.loggedIn() && userObject.userType == "Admin"){


    return true;

    }else{

        this.router.navigate(['/login']);
        return false;
    }
  }
  ngOnInit(){
   let userObject = JSON.parse(localStorage.getItem('user'))
  console.log(userObject)
}
}
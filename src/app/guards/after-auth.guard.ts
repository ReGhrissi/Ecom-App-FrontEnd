import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';


@Injectable({
  providedIn: 'root'
})

export class AfterAuthGuard implements CanActivate {

    constructor(
      private tokenService: TokenService,
      private accountService: AccountService,
      private router: Router
    ) {}


      canActivate(

        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot):  boolean 
        {

          if(this.tokenService.loggedIn()) 
          {
            this.router.navigateByUrl("/");
            return false;
          }

        return true;
      }
}
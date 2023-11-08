import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate  {
  
  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      if(!this.tokenService.loggedIn()) 
      {
        this.router.navigateByUrl('/login');
        this.tokenService.remove();
        this.accountService.changeAuthStatus(false);
        return false;
     }
     console.warn('ok')
     return true;
  }
};

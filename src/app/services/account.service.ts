import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { TokenService } from './token.service';
import { User } from '../_Model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // BehaviorSubject -> joue le role de gestionnaire des sessions dans le Backend
  private LoggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());
  private Role = new BehaviorSubject<boolean>(this.tokenService.isAdmin());

  isAuth = this.LoggedIn.asObservable();
  isAdmin =this.Role.asObservable();

  constructor(private tokenService:TokenService) { }

  changeAuthStatus(value:boolean)
  {
    this.LoggedIn.next(value);
  }

  changeRoleStatus(value:boolean)
  {
    this.Role.next(value);
  }
}

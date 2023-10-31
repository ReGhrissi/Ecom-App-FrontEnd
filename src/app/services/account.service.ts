import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  // BehaviorSubject -> joue le role de gestionnaire des sessions dans le Backend
  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());

  isAuth = this.loggedIn.asObservable();


  constructor(private tokenService:TokenService) { }

  changeStatus(value:boolean)
  {
    this.loggedIn.next(value);
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AccountService } from '../services/account.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor(private token: TokenService , private accountService:AccountService ) {}

  

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      if(this.token.getToken())
      {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${ this.token.getToken() }`
            }
          });
      
          return next.handle(request);
      }
      else return next.handle(request);
    }
    
    
  }



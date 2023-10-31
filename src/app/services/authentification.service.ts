import { Injectable, booleanAttribute } from '@angular/core';

import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { TokenService } from './token.service';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {


  public host:string="http://localhost:8090";

   // Utilisateurs pour le Test
   private usres=[

    {username:'admin',password:'123',roles:['ADMIN','USER']},
    {username:'user1',password:'123',roles:['USER']},
    {username:'user2',password:'123',roles:['USER']}
  ]

 

  public token:any;

  public isAuthenticated:any; // modifié ????
  public userAuthenticated:any;

  constructor( private httpClinet:HttpClient, private tokenService : TokenService ) { }

  // Methode qui permet de faire un Login
      public login(username:string,password:string)
      {
        let user; //par deffaut user=undefined
        
        this.usres.forEach(
          u=>{
                    if(u.username==username && u.password==password)
                    {
                      user=u;
                      this.token={username:u.username, roles:u.roles};
                    // this.token=btoa(JSON.stringify({username:u.username, roles:u.roles}));
                    }
              });

                if(user) // si user n'est plus undefined
                {
                    this.isAuthenticated=true;
                    this.userAuthenticated=user;
                  // localStorage.setItem("userAuthenticated",JSON.stringify(this.userAuthenticated));
                }
                else
                {
                    this.isAuthenticated=false;
                    this.userAuthenticated=undefined;
                }
      }

      public onLogin(data : {email:string , password:string})
      {
        return this.httpClinet.post(this.host+"/users/login",data)
      }

      public onRegister(data : {firstName: string,lastName :string, email:string , password:string})
      {
        return this.httpClinet.post(this.host+"/users",data)
      }

      public isAuth()
      {
        return this.isAuthenticated;
      }

      // Methode qui permet de verifier si l'utilisateur est ADMIN
      public isAdmin(): boolean
      {
        var variable :boolean = false;

          if(this.userAuthenticated)
          {
                      // chercher dans le tableau roles s'il existe un role 'ADMIN
             if( this.userAuthenticated.roles.indexOf('ADMIN')>-1)
             {
               variable= true;
             }

             else variable = false; 
          }

          return variable;
      }

  // Methode qui permet de stocker le token dans le localStorage
      public saveAuthenticatedUser()
      {
          if(this.userAuthenticated)
          {
            
              localStorage.setItem('userToken',btoa(JSON.stringify(this.token))); // chaine de caracteres ms en format JSON
           // localStorage.setItem('userToken',this.token); 
          }
      }

  // Methode qui permet de récuperer le token du localStorage
      public loadAuthUserFromLocalStorage()
      {
        let t=localStorage.getItem('userToken');
        if(t)
        {
          let user=JSON.parse(atob(t)); // atob() l inverse de btoa()
          this.userAuthenticated={username:user.username,roles:user.roles}; 
          this.isAuthenticated=true;
          this.token=t;

        }
      }

  // Methode qui permet de supprimer le token du localStorage
      public removeTokenFromLocalStorage()
      {
        localStorage.removeItem('userToken');
        this.isAuthenticated=false;
        this.token=undefined;
        this.userAuthenticated=undefined;
      }

    

}

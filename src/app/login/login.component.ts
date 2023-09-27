import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthentificationService, private router:Router) // injectiond e dependance
   { }

  

  ngOnInit(): void {
  }


  // Methode qui permet de faire un loginng
  onLogin(dataForm : any)
  {
    this.authService.login(dataForm.username,dataForm.password);

    if(this.authService.isAuthenticated) // if true
    {
        this.authService.saveAuthenticatedUser();
        this.router.navigateByUrl(''); // ''-> route par defaut qui va vers les produits selectionés
    }

  }

  
}

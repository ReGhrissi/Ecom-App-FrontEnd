import { Component, OnInit} from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { Modal } from 'flowbite'
import type { ModalOptions, ModalInterface } from 'flowbite'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faSubscript } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from '../services/token.service';
import {Observable, catchError} from 'rxjs';
import { Location } from '@angular/common';
import { AccountService } from '../services/account.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthentificationService, 
    private router:Router,
    private tokenService : TokenService,
    private accountService:AccountService,
    private location :Location
   ) // injectiond e dependance
  { }

  modalVisible: boolean = false;

  loginForm = new FormGroup({

        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl( '',[Validators.required,Validators.minLength(3)])
        
  });

  get Email()
  {
    return this.loginForm.get('email');
  }
  get Password()
  {
    return this.loginForm.get('password');
  }



  

        ngOnInit(): void {

          /**
          const modalButton = this.el.nativeElement.querySelector('[data-modal-target="authentication-modal"]');
          const modal = this.el.nativeElement.querySelector('#authentication-modal');

          modalButton.addEventListener('click', () => {
            this.renderer.addClass(modal, 'active'); // Ajoutez une classe pour afficher le modal
          });

          modal.addEventListener('click', () => {
            this.renderer.removeClass(modal, 'active'); // Supprimez la classe pour masquer le modal
          });

          */
        }

  showModal() {
    this.modalVisible = true;
  }
  
  hideModal() {
    this.modalVisible = false;
  }

  onLogin()
  {
    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.authService.onLogin( {email, password} ).pipe(
        catchError (err => {
          console.log(err);

          if(err.status == 401)
          {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Votre Login ou Mot de passe sont incorrectes ! ",
                showConfirmButton: false,
                timer: 3000
              });
          }
          else if(err.status == 404)
          {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Erreur d'authentification : "+err.status,
              showConfirmButton: false,
              timer: 3000
            });

          }
              

          throw err;    
        })
      ).subscribe((res : any)=> {

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Bienvenue !",
            showConfirmButton: false,
            timer: 2000
          });
       
          
          setTimeout(() => 
          {
            this.handleResponse(res);
            
          }, 1500);
      
          

      });
  }
 
  handleResponse(data : any) 
  {
    this.tokenService.handle(data);
    this.accountService.changeAuthStatus(true);
    //this.location.back()
    this.router.navigate(['/']).then(() => {

        window.location.reload();  
    });

  
    
    //this.router.navigateByUrl('/')
  }

  /*
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
  */

  
}
 
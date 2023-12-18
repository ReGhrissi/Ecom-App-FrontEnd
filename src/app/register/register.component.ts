import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import {Observable, catchError} from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService :AuthentificationService, private router:Router)
  {}
  
  registerForm = new FormGroup({

    firstName: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl( null,[Validators.required, Validators.minLength(8)]),
    password_conf: new FormControl( null,[Validators.required, Validators.minLength(8)])
    
    });

    get First_Name()
    {
      return this.registerForm.get('firstName');
    }
    get Last_Name()
    {
      return this.registerForm.get('lastName');
    }
    get Email()
    {
      return this.registerForm.get('email');
    }
    get Password()
    {
      return this.registerForm.get('password');
    }
    get Password_Conf()
    {
      return this.registerForm.get('password_conf');
    }

  onRegister()
  {
    const firstName = this.registerForm.get('firstName')?.value || '';
    const lastName = this.registerForm.get('lastName')?.value || '';
   // const firstName ="mohammed";
    //const lastName ="beeeeeeeee"
    const email = this.registerForm.get('email')?.value || '';
    const password = this.registerForm.get('password')?.value || '';

    this.authService.onRegister( {firstName,lastName,email, password} ).pipe(
        catchError (err => {
          console.log(err);

              const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: "bg-blue-800 text-white active:bg-black hover:bg-black font-bold  text-md w-20 px-2 py-3 mx-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150",
                },
                buttonsStyling: false
              });

              if(err.error.message == 'User Alrady Exists !')
              {
                swalWithBootstrapButtons.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Email non accepté !",
                  text: "l'Email que vous avez utilisé existe déja. Veuillez utiliser une autre adresse Email !",
                  showConfirmButton: true 
                });
              }
              else
              {
                swalWithBootstrapButtons.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Erreur  : "+err.status,
                  text: "Erreur dans la création du compte. Essayez à nouveau !",
                  showConfirmButton: false,
                  timer:3000
                });
              }

          throw err;    
        })
      ).subscribe((res : any)=> {

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-blue-800 text-white active:bg-black hover:bg-blue-700 font-bold  text-md w-32 px-2 py-3 mx-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150",
            cancelButton: "bg-black text-white active:bg-black hover:bg-gray-700 font-bold  text-md w-32 px-2 py-3 mx-2  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Félicitations !",
          text: "Votre compte a été créé avec succès. Veuillez utiliser vos données d'autentification pour se connecter",
          icon: "success",
          showCancelButton: true,
          confirmButtonText: "Se connecter",
          cancelButtonText: "Retour",
          reverseButtons: true
          }).then((result) => {

              if (result.isConfirmed) 
              {
                  this.router.navigateByUrl('/login')   
              } 
              else if 
              (result.dismiss === Swal.DismissReason.cancel) 
              {
                  this.router.navigateByUrl('/home')
              }
        });

      });
  }
}

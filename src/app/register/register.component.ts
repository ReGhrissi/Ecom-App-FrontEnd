import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import {Observable, catchError} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private authService :AuthentificationService)
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

          throw err;    
        })
      ).subscribe((res : any)=> {
          console.log(res)
          alert("seccuss");
      });
  }
}

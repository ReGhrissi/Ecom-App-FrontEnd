import { Component } from '@angular/core';
import { Icons } from '../_Plugins/icons.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthentificationService } from '../services/authentification.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {


  icons :Icons =new Icons();
  myNew=this.icons.myNew
  myCancel=this.icons.myCancel;
  myUserName =this.icons.myUserName
  myEmail=this.icons.myEmail
  myPassword=this.icons.myPassword

  newUser:any;

  constructor(private authService:AuthentificationService, private router :Router, private location:Location)
  {}

  newUserForm = new FormGroup ({

    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,[Validators.required]),
    email: new FormControl(null,[Validators.required]), 
    password: new FormControl(null,[Validators.required]), 
    password_conf: new FormControl( null,[Validators.required])
    
  });

  get First_Name()
  {
    return this.newUserForm.get('firstName');
  }
  get Last_Name()
  {
    return this.newUserForm.get('lastName');
  }
  get Email()
  {
    return this.newUserForm.get('email');
  }
  get Password()
  {
    return this.newUserForm.get('password');
  }
  get Password_Conf()
  {
    return this.newUserForm.get('password_conf');
  }

  onBack()
  {
    this.location.back();
  }
  onNewUser()
  {

    const firstName = this.newUserForm.get('firstName')?.value || '' ;
    const lastName = this.newUserForm.get('lastName')?.value || '' ;
    const email = this.newUserForm.get('email')?.value || '' ;
    const password = this.newUserForm.get('password')?.value || '' ;

    this.authService.onRegister( {firstName,lastName,email, password}).pipe(

      catchError(err => {
                        console.log(err);

                        Swal.fire({
                          position: "top-end",
                          icon: "error",
                          title: "Erreur : "+err.status,
                          text:"",
                          showConfirmButton: false,
                          timer: 2000
                        });
        throw err;
      })
      ).subscribe((data:any)=> {

          this.newUser =data;

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "",
            text:"",
            showConfirmButton: false,
            timer: 2000
          });

          setTimeout(() => 
          {
            this.router.navigateByUrl('/user-edit/'+this.newUser.userId)   
            
          }, 1500);
      
           

        });
  }
}

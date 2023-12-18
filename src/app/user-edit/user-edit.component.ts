import { Component, OnInit } from '@angular/core';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  icons : Icons = new Icons();
  myCancel=this.icons.myCancel;
  myNew=this.icons.myNew
  myEdit=this.icons.myEdit
  myId=this.icons.myKey;
  myUserName=this.icons.myUserName
  myAdmin=this.icons.myAdmin

  idUser:any;
  currentUser:any;
 // editUserForm:any;

  constructor(public userService:UserService, public router:Router,
    private activeRoute :ActivatedRoute, private location:Location)
  {}


  ngOnInit(): void {

    this.activeRoute.params.subscribe((data)=>
    {           
        this.idUser = data['userId'];

            if(this.idUser)
            {
                this.userService.getUser(this.idUser).subscribe({

                  next: data => {
                                  this.currentUser=data;

                                 
                             
                                  

                                  if(this.currentUser)
                                  {
                                      this.editUserForm.patchValue({
                                          firstName: this.currentUser.firstName,
                                          lastName: this.currentUser.lastName,
                                          admin: this.currentUser.admin,
                                          active: this.currentUser.active
                                      });
                                  }
                                  
                                },
                  error: err => console.error(err)
                });  
              } 

    })

    
  }

  editUserForm = new FormGroup ({

    firstName: new FormControl(null,[Validators.required]),
    lastName: new FormControl(null,[Validators.required]),
    admin : new FormControl(null,[Validators.required]), 
    active : new FormControl(null,[Validators.required]),               
});

  onBack()
  {
    this.location.back();
  }
  
  onUpdateUser()
  {

    const firstName = this.editUserForm.get('firstName')?.value || '' ;
    const lastName = this.editUserForm.get('lastName')?.value || '' ;
    const admin = this.editUserForm.get('admin')?.value || false ;
    const active = this.editUserForm.get('active')?.value || false ;


    this.userService.updateUser("/users/"+this.currentUser.userId, { firstName, lastName, admin, active }).pipe(

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

          this.currentUser =data;

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
            this.location.back();
              
          }, 1500);
      
          

        });
  }





}

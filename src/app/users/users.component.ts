import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs'
import { Icons } from '../_Plugins/icons.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  icons :Icons =new Icons();

  myNew=this.icons.myNew
  myEdit=this.icons.myEdit
  myAdmin =this.icons.myAdmin
  myUser=this.icons.myUserName

  users: any;

      constructor(public userService: UserService, private router:Router)
      {

      }
      
      ngOnInit(): void {

          this.getAllUsers()
      }

  getAllUsers()
  {
    this.userService.getAll().pipe(
      catchError (err => {
        console.log(err);

        throw err;    
      })
    ).subscribe((res : any)=> {
    
        this.users=res;
    });
  }

  onEdit(userId:any)
  {
    this.router.navigateByUrl("/user-edit/"+userId);
  }
}

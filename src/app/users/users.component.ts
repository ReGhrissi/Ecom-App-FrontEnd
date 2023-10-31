import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{

  users: any;

      constructor(private userService: UserService)
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
}

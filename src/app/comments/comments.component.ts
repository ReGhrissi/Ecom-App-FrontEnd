import { Component, OnInit } from '@angular/core';
import { Icons } from '../_Plugins/icons.model';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {

  icons :Icons = new Icons()
  myDelete=this.icons.myDelete
  myBack=this.icons.myBack

  idUser:any;
  comments:any;
  currentUser:any;
  isComments :boolean =true;
  

  constructor(private activateRoute:ActivatedRoute, private commentService :CommentService, public userService:UserService)
  {}

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe((data)=>
    {              
            this.idUser = data['idUser']

            this.userService.getUser(this.idUser).subscribe({

                next: (data:any) => {
                                  this.currentUser=data;
                              },

                error: err => console.error(err)
            });

           this.commentService.onGetUserComment().subscribe({

             next: (data:any) => {

                               this.comments=data;

                               if(this.comments)
                               {
                                this.isComments=false;
                               }

                            //   console.log("comments :"+ this.comments[0].commentText)
                              // console.log("current USER :"+data.addresses[0].type)

                           },

             error: err => console.error(err)
         });

     })



  }


}

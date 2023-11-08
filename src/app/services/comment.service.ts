import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  host="http://localhost:8090";

  constructor(private httpClient:HttpClient) { }


  onPostComment(url :any, formData :{commentText:string, commentDate : Date})
  {
    return this.httpClient.post(this.host+url ,formData) 
  }

  onGetUserComment()
  {
    return this.httpClient.get(this.host+"/comments")
  }
}

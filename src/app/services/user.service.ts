import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host="http://localhost:8090"

  constructor(private httpClient : HttpClient) { }

  getAll()
  {
    return this.httpClient.get(this.host+"/users")
  }
}

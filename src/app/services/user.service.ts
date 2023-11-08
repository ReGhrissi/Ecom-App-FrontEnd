import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  host="http://localhost:8090"
  requestMapping ="/users"; // du Controlleur UserController

  constructor(private httpClient : HttpClient) { }

  getAll()
  {
    return this.httpClient.get(this.host+"/users")
  }

  getUser(id :any)
  {
    return this.httpClient.get(this.host+"/users/"+id)
  }

  updateUser(url :any, formData : {firstName:string , lastName:string, 
                                   contact:{country: string,city:string,street:string,postal:string, mobile:string,skype:string},
                                   paymentCard:{cardNumber :string,cardOwner:string}
                                    })
  {
    return this.httpClient.put(this.host+url ,formData)
  }


  // methode qui permet de faire un Upload de la photo d'un produit
  uploadPhotoProduct(file:File, userId :any): Observable<HttpEvent<{}>>
  {
          let formData:FormData =new FormData();

          formData.append('file',file);

          const req =new HttpRequest('POST', this.host + this.requestMapping +'/uploadPhoto/'+userId, formData, {

                  reportProgress:true,
                  responseType:'text',
          });

              return this.httpClient.request(req);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../_Model/product.model';
import { GatewayService } from './gateway.service';
import { MicroServicesName } from '../_Enum/micro-service';



@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

    //backEnd port
    public GATEWAY :GatewayService = new GatewayService()
    public microServiceName : MicroServicesName = MicroServicesName.E_COMMERCE

    //public host:string= this.GATEWAY.gateway+this.microServiceName;
    public host:string ="http://localhost:8090"
    constructor(
                    private http:HttpClient      
                ) 
                {}

    

    // methode qui permet la recuperation des différentes ressources de la BD
        public getRessource(url :any)
        {
            console.log(this.host)
            return this.http.get(this.host+url);
            
        }

        public postRessource(url:any, data:any)
        {
            return this.http.post(this.host+url,data);
        }
   
      
    // methode qui permet la recuperation d'un produit
        public getProduct(url : any):Observable<Product>
        {
            return this.http.get<Product>(url);
        }


    // methode qui permet de faire un Upload de la photo d'un produit
        uploadPhotoProduct(file:File, idProduct :any): Observable<HttpEvent<{}>>
        {
            let formData:FormData =new FormData();

            formData.append('file',file);

            const req =new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formData, {

                    reportProgress:true,
                    responseType:'text',
            });

                return this.http.request(req);
        }

    // methode qui permet la modification d'un produit    
      public patchResource(url:any,data:any){

        return this.http.patch(url,data);
      }

      getNumberOfProductsForCategory(categoryId: number): any {
  
            return this.http.get<number>(`/categories/${categoryId}/products/count`);
      }

}

import { Injectable } from '@angular/core';
import { Order } from '../_Model/order.model';
import { PanierService } from './panier.service';
import { HttpClient } from '@angular/common/http';
import { CatalogueService } from './catalogue.service';
import { Client } from '../_Model/client.model';
import {Observable, catchError} from 'rxjs';
import { Caddy } from '../_Model/caddy.model';
import { ProductItem } from '../_Model/product-item.model';
import { GatewayService } from './gateway.service';
import { MicroServicesName } from '../_Enum/micro-service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

      //backEnd port
      public GATEWAY :GatewayService = new GatewayService()
      public microServiceName : MicroServicesName = MicroServicesName.CLIENTS_ORDERS
  
      //public host:string= this.GATEWAY.gateway+this.microServiceName;
    public host:string ="http://localhost:8090"

    public order:Order=new Order();
    public currentOrderData:Order = new Order();
    public updatedOrder : Order = new Order();

 // public mainPanelStyle = "panel-default";
 // public clientPanelStyle= "panel-primary";
 // public productsPanelStyle= "panel-primary";
  
  constructor(
                private panierService:PanierService,
                private httpClient:HttpClient,
                //private catalService:CatalogueService
              )
              {}
 

  public setClient(client:Client)
  {
    this.order.client=client;
  }


  public loadProductsFromCaddy() 
  {
      this.order.products = [];
      let caddy : Caddy = this.panierService.loadCaddyFromLocalStorage();

      caddy.items.forEach((value, key) => {

             this.order.products.push(value);
      });
  }

  /*
      public loadProductsFromCaddy() {
        this.order.products = [];

        for (const [key, value] of this.panierService.loadCaddyFromLocalStorage().items) {
          this.order.products.push(value);
        }
      }
  */

 
  public getTotal():number
  {
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    
    return total;
  }


  submitOrder() 
  {
    console.log(this.order)

    return this.httpClient.post(this.host+"/orders",this.order).pipe(

      catchError(err => {
        console.log(err);

          //  this.mainPanelStyle = "panel-danger";

        throw err;

      })
    ).subscribe((data:any)=> {
/*
      if(data['id']!=0)
      {
        this.mainPanelStyle = "panel-success";
        this.clientPanelStyle= "panel-default";
        this.productsPanelStyle= "panel-default";
      }

     */
          console.log("dataaaaaaaa :"+data)

      this.currentOrderData =data;

      console.log("currectOder :"+this.currentOrderData)

              console.log("ID commande avant submit :"+this.order.id)
            this.order.id = data['id'];
              console.log("ID commande apres submit :"+this.order.id)
    
              console.log("date commande avant submit :"+this.order.date)
            this.order.date = data['date'];
              console.log("date commande apres submit :"+this.order.date)
    
           
 
    });
    
  }
/*
  updateOrder(payment :any)
  {
    this.currentOrderData.payment=payment;

    console.log("Order à modifier par PATCH :"+ JSON.stringify(this.currentOrderData))

    return this.httpClient.patch(this.host+"/orders/"+this.currentOrderData.id,this.currentOrderData).pipe(
          catchError(err => {
            console.log(err);

            throw err;
            
          })
        ).subscribe((data : any)=> {
        
              console.log("dataaaaaaaa :"+data)

          this.updatedOrder =data;
    
        });
        
  }
*/

  public getOrder(id:number)
  {
    return this.httpClient.get(this.host+"/orders/"+id)
  }



}

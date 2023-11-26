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
import { OrderStatus } from '../_Enum/order-satus';

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
      this.order.orderItems = [];
      let caddy : Caddy = this.panierService.loadUserCaddyFromLocalStorage();

      caddy.items.forEach((value, key) => {

             this.order.orderItems.push(value);
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
    this.order.orderItems.forEach(p=>{
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

            //  console.log("ID commande avant submit :"+this.order.id)
            this.order.orderId = data['orderId'];
            //  console.log("ID commande apres submit :"+this.order.id)
    
              console.log("date commande avant submit :"+this.order.orderDate)
            this.order.orderDate = data['orderDate'];
              console.log("date commande apres submit :"+this.order.orderDate)
    
    });
    
  }

  updateOrderStatus(url :any, formData : {orderStatus:any , reasonOfStatus:string})
  {
    return this.httpClient.put(this.host+url,formData)
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


  getRegisterdOrdersStetus()
  {
    return this.httpClient.get(this.host+"/orders/registeredOrders")
  }

  getOrdersByStatus(status:any)
  {
    return this.httpClient.get(this.host+"/orders"+status)
  }

  getOrdersByUser(userId:any)
  {
    return this.httpClient.get(this.host+"/orders/"+userId)
  }
}


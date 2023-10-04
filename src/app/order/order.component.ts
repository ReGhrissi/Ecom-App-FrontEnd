import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthentificationService } from '../services/authentification.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public mode:number=0;
  
  public mainPanelStyle:string= "panel-default";
  public clientPanelStyle:string= "panel-primary";
  public productsPanelStyle:string= "panel-primary";

 // panelStyle:string= "panel-default";

        constructor(
          public orderService:OrderService,
          private authService:AuthentificationService,
          public panierService:PanierService,
          private router:Router
        ) 
        { }

      ngOnInit(): void {
    
      }

/*
  onOrder() 
  {
    this.orderService.submitOrder().
    subscribe((data :Order)=> {
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle="panel-success";
    },err=>{
      console.log(err);
    });
  }
*/  
      onOrder() 
      {
        this.orderService.submitOrder().pipe(

          catchError(err => {
            console.log(err);

                this.mainPanelStyle = "panel-danger";

            throw err;

          })
        ).subscribe((data : any)=> {
         
              console.log("dataaaaaaaa :"+data)

                  console.log("ID commande avant submit :"+this.orderService.order.id)
                this.orderService.order.id = data['id'];
                  console.log("ID commande apres submit :"+this.orderService.order.id)
        
                  console.log("date commande avant submit :"+this.orderService.order.date)
                this.orderService.order.date = data['date'];
                  console.log("date commande apres submit :"+this.orderService.order.date)
        
                this.mainPanelStyle = "panel-success";
                this.clientPanelStyle= "panel-default";
                this.productsPanelStyle= "panel-default";
     
        });
      }
    
    
  onPayOrder() {
        this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }
    
  onBack()
  {
    this.router.navigateByUrl("/client"); 
  }
    
  onCancel()
  {
        this.router.navigateByUrl("/caddy"); 
  }


}

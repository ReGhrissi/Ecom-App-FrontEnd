import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthentificationService } from '../services/authentification.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { CatalogueService } from '../services/catalogue.service';

import { faCartShopping, faCircleUser, faRightToBracket, faRightFromBracket, faUserTie, faLocationDot, faMobileScreen, faEnvelope, faCheck, faArrowLeft, faCreditCard, faXmark } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  myClinet=faUserTie;
  myaddress=faLocationDot;
  myPhone=faMobileScreen;
  myEmail=faEnvelope;
  myValid=faCheck;
  myBack=faArrowLeft;
  myCard=faCreditCard;
  myCancel=faXmark;

  public mode:number=0;
  
  public mainPanelStyle:string= "";
  public clientPanelStyle:string= "panel-default";
  public productsPanelStyle:string= "panel-default";

 // panelStyle:string= "panel-default";

        constructor(
          public orderService:OrderService,
          private authService:AuthentificationService,
          public panierService:PanierService,
          private router:Router,
          public catService:CatalogueService
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
        this.orderService.submitOrder()

        if(this.orderService.order.id!=0)
        {
          this.mainPanelStyle="panel-success";
        }
      }
    
    
  onPayOrder() {
        //faire un PATCH pour l'ordre
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

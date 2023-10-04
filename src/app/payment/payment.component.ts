import { Component , OnInit } from '@angular/core';
import { Order } from '../_Model/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { catchError } from 'rxjs';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  
 // paymentAmount:number;
  public currentOrder:Order = new Order();
  public paymentPanelStyle:string= "panel-primary";

  constructor(
              private router:Router, 
              private route:ActivatedRoute,
              private orderService:OrderService,
              public paymentService:PaymentService
              )
               { 
                
               }

  ngOnInit() 
  {

    this.getSavedOrder();

  }



  getSavedOrder()
  {
    let id=this.route.snapshot.params["orderID"]
    console.log("commane n="+id)
  
      this.orderService.getOrder(id)

  }

  onPayOrder(data:any) {

    this.getSavedOrder();

    console.log(data);
     this.paymentService.onPayment(data)

     if(this.paymentService.paymentID!=0)
     {
        this.paymentPanelStyle = "panel-success";
     }
     else if (this.paymentService.paymentID==0)
     {
      this.paymentPanelStyle = "panel-danger";
     }
   
  }
  

  onCancel()
  {

    this.router.navigateByUrl("/caddy");
  }
}

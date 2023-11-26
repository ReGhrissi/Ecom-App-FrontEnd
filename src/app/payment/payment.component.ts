import { Component , OnInit } from '@angular/core';
import { Order } from '../_Model/order.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { catchError } from 'rxjs';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../_Model/payment.model';
import { faSackDollar, faSackXmark, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  myPayment=faSackDollar;
  myDenyPayment=faSackXmark;

  selectedOption: string = ''
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
    //let id=this.route.snapshot.params["orderID"]
    console.log("Ordre de retour :"+JSON.stringify(this.orderService.currentOrderData))
    this.currentOrder = this.orderService.currentOrderData

    console.log("currentOrder :"+ JSON.stringify(this.currentOrder))
    return this.currentOrder;
    
  

  }
 
  onPayOrder(data:Payment) {

    //this.getSavedOrder();

      let payment:Payment = data;

      payment.cardNumber=data.cardNumber;
      payment.cardType=data.cardType;
      payment.order=this.orderService.currentOrderData;
      payment.order.orderDate = this.orderService.currentOrderData.orderDate;
      payment.order.client = this.orderService.currentOrderData.client;
      payment.order.totalAmount=this.orderService.currentOrderData.totalAmount;
      

      console.log(data);
      this.paymentService.onPayment(payment)

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

import { Component , OnInit} from '@angular/core';
import { OrderService } from '../services/order.service';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../_Model/payment.model';
import { Order } from '../_Model/order.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

    constructor(
                public paymentService:PaymentService,
                public orderService:OrderService
                )
    {}
  ngOnInit(): void 
  {
    /*
    let dataForUpdate:Payment = this.paymentService.currentPayment;

    //envoi comme parametre un objet de type Payment
    this.orderService.updateOrder(dataForUpdate)
   // console.log(this.paymentID);
   */

   let dataForUpdate:Order = this.orderService.currentOrderData;

   //envoi comme parametre un objet de type Payment
   this.paymentService.updatePayment(dataForUpdate)
  // console.log(this.paymentID);
    
  }
  

}

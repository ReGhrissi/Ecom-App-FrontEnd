import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Payment } from '../_Model/payment.model';
import { OrderService } from './order.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public host:string ="http://localhost:8090"

  public paymentID:any =0;
  public paymentDate:any;

      constructor(
                    private httpClient:HttpClient,
                    private orderService:OrderService
                  )
       { }

  onPayment(dataSent :any)
  {
    console.log(dataSent);
    return this.httpClient.post(this.host+"/payments",dataSent).pipe(
      catchError(err => {
        console.log(err);
        throw err;
      })
    ).subscribe((dataReceived : any)=> {
    
      console.log("le retour du payment :"+dataReceived);

      this.paymentID =dataReceived["id"];
      this.orderService.updateOrder(dataReceived)
      console.log(this.paymentID);

      this.paymentDate =dataReceived["datePayment"];
      console.log(this.paymentDate);
 
    });
  }
}

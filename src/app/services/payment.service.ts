import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Payment } from '../_Model/payment.model';
import { OrderService } from './order.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  public host:string ="http://localhost:8090"

  public paymentID:any =0;
  public paymentDate:any;

  public currentPayment:Payment = new Payment()

  public updatedPayment : Payment = new Payment();

      constructor(
                    private httpClient:HttpClient,
                    private orderService:OrderService,
                    private router:Router
                  )
       { }
 
  onPayment(dataSent :any)
  {
    console.log("le payment envoyé :"+JSON.stringify(dataSent));

    return this.httpClient.post(this.host+"/payments",dataSent).pipe(
          catchError(err => {
            console.log(err);
            throw err;
          })
        ).subscribe((dataReceived : any)=> {
        
          console.log("le retour du payment :"+JSON.stringify(dataReceived));

          this.currentPayment=dataReceived;

          console.log("currentPayement :"+JSON.stringify(this.currentPayment))

          this.paymentID =dataReceived["id"];
          if(this.paymentID!=0)
          { 
            this.router.navigateByUrl("/confirm");
          }

          
          
        });
  } 


  updatePayment(order :any)
  {
    this.currentPayment.order=order;

    console.log("le payment à modifier par PATCH :"+ JSON.stringify(this.currentPayment))

    return this.httpClient.patch(this.host+"/payments/"+this.currentPayment.id,this.currentPayment).pipe(
          catchError(err => {
            console.log(err);

            throw err;
            
          })
        ).subscribe((data : any)=> {
        
              console.log("retour de Update Payment:"+JSON.stringify(data))

          this.updatedPayment =data;
    
        });
        
  }
}

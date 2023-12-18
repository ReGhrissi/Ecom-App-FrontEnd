import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { OrderStatus } from '../_Enum/order-satus';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
//import { ObjectConstructor } from '@types/node';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})



export class OrdersComponent implements OnInit {

  icons :Icons =new Icons();

  myEmail=this.icons.myEmail
  myPhone=this.icons.myPhone
  myWhatsapp=this.icons.myWhatsapp
  myAddress=this.icons.myaddress
  myClient=this.icons.myClinet
  myEdit=this.icons.myEdit
  myNew=this.icons.myNew

  myDelivered=this.icons.myAvailable
  myCancelled=this.icons.myDeny
  mySent=this.icons.myOrdersManage
  myUnderTr=this.icons.myTimer
  myRegistered=this.icons.myNewPr
  myReturned=this.icons.myReturn

  orders:any;
  updateOrderForm : any;
  orderStatusEnum = OrderStatus;
  Object: ObjectConstructor = Object;

  
  selectedOrder: any = null;
  status:any;

  constructor(private orderService:OrderService, public catService:CatalogueService, 
              private activeRoute :ActivatedRoute, private router:Router, public userService:UserService)
  {}

  

  ngOnInit(): void {

    console.log("oooooooooooord :"+this.orderStatusEnum)
    this.activeRoute.params.subscribe((data)=>
    {              
           this.status = data['orderStatus'];
           
                       if(this.status=='ALL')
                       {
                        this.onGetOrdersByStatus('/');
                       }
                       else if(this.status=='REGISTERED')
                       {  
                         this.onGetOrdersByStatus('/registeredOrders');
                       }
                       else if(this.status=='UNDER_TREATEMENT')
                       {
                         this.onGetOrdersByStatus('/underTreatementOrders')
                
                       }
                       else if(this.status=='CANCELLED')
                       {       
                         this.onGetOrdersByStatus('/cancelledOrders')
                       }
                       else if(this.status=='SENT')
                       {  
                         this.onGetOrdersByStatus('/sentOrders')
                       }
                       
                       else if(this.status=='DELIVERED')
                       {  
                         this.onGetOrdersByStatus('/deliveredOrders')
                       }

                       else if(this.status=='RETURNED')
                       {  
                         this.onGetOrdersByStatus('/returnedOrders')
                       }

                } );

  }
  

onStatusChange(status: string) 
{
   
        this.router.navigate(['/orders/' + status]);
    
}

onGetOrdersByStatus(statusURL:any)
{
        this.orderService.getOrdersByStatus(statusURL).subscribe({

            next: (data:any) => {
                                      this.orders=data; 

                                      this.orders.sort((a:any, b:any) => {
                                        
                                            const dateA = new Date(a.orderDate);
                                            const dateB = new Date(b.orderDate);
                                            
                                            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                                             
                                              return 0;
                                            }
                                          
                                            return dateB.getTime() - dateA.getTime();
                                      });  
                                },

            error: err => console.error(err)
        }); 
}

toggleDetails(order: any): void 
{
    this.selectedOrder = order;
    console.log(this.selectedOrder)

    this.updateOrderForm = new FormGroup ({

      orderStatus: new FormControl(this.selectedOrder.orderStatus,[Validators.required]),
      reasonOfStatus: new FormControl(this.selectedOrder.reasonOfStatus,[Validators.required]),
    
    });
}

onFormatDate(dateFromBackend :any)
{
  let dateObj = new Date(dateFromBackend);

  return `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
}

onFormatTime(dateFromBackend:any)
{
  let dateObj = new Date(dateFromBackend);
  return `${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
}

  getStatusLabel(status: string): string 
  {
    switch (status) {
        case OrderStatus.Nouvelle:
            return 'Nouvelle';
        case OrderStatus.Payé:
            return 'Payé';
        case OrderStatus.En_cours_de_traitement:
            return 'En cours de traitement';
        case OrderStatus.Annulée:
            return 'Annulée';
        case OrderStatus.Envoyée:
            return 'Envoyée';
        case OrderStatus.Livrée:
            return 'Livrée';
        case OrderStatus.Retour:
            return 'Retour';
        default:
            return status;
    }
  }
  onUpdateStatus(orderId:any)
  {
    const orderStatus  = this.updateOrderForm.get('orderStatus')?.value || '' ;
    const reasonOfStatus = this.updateOrderForm.get('reasonOfStatus')?.value || '' ;

    //const orderStatusFrontend = mapToFrontendStatus(orderStatusBackend);

    let url = "/orders/"+orderId

    this.orderService.updateOrderStatus(url, { orderStatus, reasonOfStatus }).subscribe({

      next: (data:any) => {
                        this.selectedOrder=data;
                        window.location.reload();
                       //this.selectedOrder = null;
                    },

      error: err => console.error(err)
    });

  }


  
}

declare var Object: any;

import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';
import { OrderService } from '../services/order.service';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: ['./history-orders.component.css']
})
export class HistoryOrdersComponent implements OnInit{

  icons :Icons =new Icons();

  myEmail=this.icons.myEmail
  myPhone=this.icons.myPhone
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

  currentUserPayload:any;
  currentUserOrders:any;
  selectedOrder:any;

  
  constructor(private accountService:AccountService, private tokenService:TokenService, 
              private orderService:OrderService, public catService:CatalogueService, public userService:UserService)
  {}


  ngOnInit(): void {
    
      this.accountService.isAuth.subscribe( res=> {
            if(res==true)
            {
              this.currentUserPayload = this.tokenService.getInfos();

              this.onGetOrdersByStatus(this.currentUserPayload.id)
            }  
      })

  }

  onGetOrdersByStatus(userId:any)
  {
        this.orderService.getOrdersByUser(userId).subscribe({

            next: (data:any) => {
                                    this.currentUserOrders=data;   
                                },

            error: err => console.error(err)
        }); 
  }

  toggleDetails(order: any): void 
  {
      this.selectedOrder = order;
  }



}

import { Component , OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthentificationService } from '../services/authentification.service';
import { PanierService } from '../services/panier.service';
import { Router } from '@angular/router';
import { Client } from '../_Model/client.model';
import { Observable, identity } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../_Model/order.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  


  constructor(
                public orderService:OrderService,
                private authService:AuthentificationService,
                public panierService:PanierService,
                private router:Router,
                public httpClient : HttpClient
              ) 
              { }


  ngOnInit(): void {
    
  }


  onSaveClient(client:Client) {

    client.username=this.authService.userAuthenticated.username;
    this.orderService.setClient(client);
    this.panierService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    /*
    this.httpClient.post(this.host+"/clients",client).pipe(
      catchError(err => {
        console.log(err);
        this.panelStyle = "panel-danger";
        throw err;
      })
    ).subscribe((data : any)=> {
      // Utilisez les propriétés de l'objet Order ici

        this.panelStyle = "panel-success";
 
    });;
    */
    //this.mode=1;
    this.router.navigateByUrl("/order");
  }

 

}

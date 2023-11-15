import { Component , OnInit } from '@angular/core';
import { Caddy } from '../_Model/caddy.model';
import { CatalogueService } from '../services/catalogue.service';
import { Router } from '@angular/router';

import { AuthentificationService } from '../services/authentification.service';
import { ProductItem } from '../_Model/product-item.model';
import { PanierService } from '../services/panier.service';

import { faBasketShopping, faBullhorn, faCartPlus, faCheckCircle, faSplotch, faTrash, faUpload, faUserPen, faXmark } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { Icons } from '../_Plugins/icons.model';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})

export class CaddyComponent implements OnInit {

  icons :Icons =new Icons();

  myGoTo= this.icons.myGoTo;
  myDelete=this.icons.myDelete;
  myOrder=this.icons.myOrder;

  //public Items : any
    public caddy : Caddy

  constructor(
              private router:Router,
              public catService:CatalogueService,         
              public panierService:PanierService, 
              public accountService:AccountService,
              ) 

              { 
                 //this.Items= new ProductItem()
                 this.caddy = new Caddy()
              }
  
  ngOnInit() 
  {

    if(this.accountService.isAuth) 
    {
      this.getUserCaddy()
    }

    else
    {
      this.getGuestCaddy()
    }
    
  }


  onRemoveProductFromCaddy(p: ProductItem) {
    this.panierService.removeProduct(p.productId);
  }

//---------------------------------------------- ici -----------------------

      getTotal() 
      {
        return this.panierService.getTotal();
      }

      getUserCaddy()  :Caddy
      {
        this.caddy = this.panierService.loadCaddyFromLocalStorage();

        return this.caddy;
      }

      getGuestCaddy() : Caddy
      {
        this.caddy = this.panierService.loadCaddyFromLocalStorage();

        return this.caddy
      }

      onNewOrder()
      {
        if(!this.accountService.isAuth)
            {
                this.router.navigateByUrl('/login');
                
            }
          else
            {
              this.router.navigateByUrl("/client");
            }
            
      }

}
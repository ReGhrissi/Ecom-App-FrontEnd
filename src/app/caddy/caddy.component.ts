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
    isAuth:boolean=false;

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
          this.accountService.isAuth.subscribe( res=> {

              if(res==true)
              {
                this.isAuth=true;
                this.getUserCaddy()
              }
              else this.getGuestCaddy()
            
          })
    
  }


  onRemoveProductFromCaddy(p: ProductItem) {

        if(this.isAuth)
        {
          this.panierService.removeUserProduct(p.id);
        }
        else this.panierService.removeGusetProduct(p.id);     
  }

//---------------------------------------------- ici -----------------------

incrementQuantity(item :any) 
{
    if (item.quantity < 10) 
    {     // Empêche d'aller au-delà de 10
          item.quantity = (item.quantity - item.quantity)+1;
          
          if(this.isAuth)
          {
            this.panierService.addUserProduct(item);
            this.ngOnInit();
          }
          else
          {
            this.panierService.addGuestProduct(item);
            this.ngOnInit();
          } 
    }
}

decrementQuantity(item:any) 
{
      if (item.quantity > 1) 
      { // Empêche d'aller en dessous de 1
            item.quantity = (item.quantity - item.quantity)-1;

            if(this.isAuth)
            {
              this.panierService.addUserProduct(item);
              this.ngOnInit();
            }
            else
            {
              this.panierService.addGuestProduct(item);
              this.ngOnInit();
            } 
      }
}
      getTotal() 
      {
            if(this.isAuth)
            {
              return this.panierService.getUserTotal();
            }

            else return this.panierService.getGuestTotal();       
      }

      getUserCaddy()  :Caddy
      {
        this.caddy = this.panierService.loadUserCaddyFromLocalStorage();

        return this.caddy;
      }

      getGuestCaddy() : Caddy
      {
        this.caddy = this.panierService.loadGuestCaddyFromLocalStorage();

        return this.caddy
      }

      onNewOrder()
      {
        if(!this.isAuth)
        {
                this.router.navigateByUrl('/login');
                
        }
        else this.router.navigateByUrl("/client");
                 
      }

}
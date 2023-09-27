import { Component , OnInit } from '@angular/core';
import { Caddy } from '../_Model/caddy.model';
import { CatalogueService } from '../services/catalogue.service';
import { Router } from '@angular/router';
//import { CaddyService } from '../services/caddy.service';
import { AuthentificationService } from '../services/authentification.service';
import { ProductItem } from '../_Model/product-item.model';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})

export class CaddyComponent implements OnInit {

  //public Items : any
    public caddy : Caddy

  constructor(
              private router:Router,
              public catService:CatalogueService,         
              public panierService:PanierService, 
              public authService:AuthentificationService,
              ) 

              { 
                 //this.Items= new ProductItem()
                 this.caddy = new Caddy()
              }
  
  ngOnInit() 
  {

    if(this.authService.isAuthenticated) 
    {
      this.getUserCaddy()
    }

    else
    {
      this.getGuestCaddy()
    }
    
  }


  onRemoveProductFromCaddy(p: ProductItem) {
    this.panierService.removeProduct(p.id);
  }

//---------------------------------------------- ici -----------------------

getTotal() {
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
        if(!this.authService.isAuthenticated)
            {
                this.router.navigateByUrl('/login');
                
            }
          else
            {
              this.router.navigateByUrl("/client");
            }
            
      }

}
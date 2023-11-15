import { Injectable } from '@angular/core';
import { AuthentificationService } from './authentification.service';
import { Caddy } from '../_Model/caddy.model';
import { ProductItem } from '../_Model/product-item.model';
import { Product } from '../_Model/product.model';
import { Client } from '../_Model/client.model';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})

export class PanierService {


  public myCaddy;
 
  constructor(
               public accountService:AccountService, public authenticationService:AuthentificationService
              ) 

                { 
                  this.myCaddy = new Caddy();
                
                }


  public loadCaddyFromLocalStorage() : Caddy
  {
        let productsFromCaddy : ProductItem[] = [];

        if(this.accountService.isAuth)
        {
                let productsUserCaddy =localStorage.getItem("monPanier_"+this.authenticationService.userAuthenticated.email+"_");

              //  console.log ("les produis from panier :"+ productsUserCaddy)

              
                if(productsUserCaddy)
                {
                  productsFromCaddy = JSON.parse(productsUserCaddy)
                }
                for (let pFC of productsFromCaddy)
                {
                  this.myCaddy.items.set(pFC.productId,pFC)
                }
                 
            return this.myCaddy;

        } 
        else
        {
                let productsGuestCaddy =localStorage.getItem("Panier_GUEST");
                
                if(productsGuestCaddy)
                {
                  productsFromCaddy = JSON.parse(productsGuestCaddy)
                }
                for (let pFC of productsFromCaddy)
                {
                  this.myCaddy.items.set(pFC.productId,pFC)
                }

            return this.myCaddy;

        }
/** 
 * 
 * 
         let productsFromCaddy : object[] = [];
         
         if(this.authService.isAuthenticated)
         {
              let productsUserCaddy =localStorage.getItem("monPanier_"+this.authService.userAuthenticated.username+"_");

              //  console.log ("les produis from panier :"+ productsUserCaddy)

              
                if(productsUserCaddy)
                {
                  productsFromCaddy = JSON.parse(productsUserCaddy)
                }
                 
                return productsFromCaddy;
                } 
                else
                {
                let productsGuestCaddy =localStorage.getItem("Panier_GUEST");
                if(productsGuestCaddy)
                {
                  productsFromCaddy = JSON.parse(productsGuestCaddy)
                }
                return productsFromCaddy;
          }
        */
  }

            
   
  
 

      public addProduct(product:Product)
      {
          this.addProductToCaddy(product.productId,product.name,product.currentPrice,product.quantity)
          this.saveCaddyOnlocalStorage();
      }

  // Methode qui permet d'ajouter un produit dans le panier
      public addProductToCaddy(id:number,name:string,price:number,quantity:number):void // remplacer product:Product
      {
        
                  this.myCaddy= this.loadCaddyFromLocalStorage();

                  let caddy= this.myCaddy;
                  
                  if(caddy)
                  {
                     let item=caddy.items.get(id);
                  
                  

                        if(item===undefined) 
                        {
                          item=new ProductItem();
                            item.productId=id;
                            item.name=name;
                            item.price=price;
                            item.quantity=quantity;
                        
                          caddy.items.set(id,item); //????????????
                        }
                        else{
                          item.quantity+=quantity;
                        }
                        console.log(item)

                    } 

                    console.log(caddy);
                    this.myCaddy=caddy;
                    
                    console.log(this.myCaddy)
                    //this.saveCaddyOnlocalStorage()
      
      }
/*
      saveCaddy() {
        let caddy=this.caddies[this.currentCaddyName];
        localStorage.setItem("myCaddy_"+this.authService.authenticatedUser.username+"_"+this.currentCaddyName,JSON.stringify(caddy));
      }
*/
      public saveCaddyOnlocalStorage()
      {
        
        if (this.myCaddy)
        {
          
        const productsInCaddy : ProductItem[] = [];

         let items :IterableIterator<ProductItem> = this.myCaddy.items.values()

            for( let i of items)
            {
              productsInCaddy.push(i);     
            }

            if(this.accountService.isAuth)
            {
                localStorage.setItem("monPanier_"+this.authenticationService.userAuthenticated.email+"_",JSON.stringify(productsInCaddy));
            }

            localStorage.setItem("Panier_GUEST",JSON.stringify(productsInCaddy));
            
            this.loadCaddyFromLocalStorage();

        }

        
      }

      
  /*
   // appellée dans le Component Caddy
    public getCaddy():Caddy{
      let myCaddy=this.caddy;
      console.log(myCaddy)
      return myCaddy;
  }
*/


//-----------------------   fi ici    --------------------------------------

    public removeProduct(id:number):void
    {
      let caddy=this.loadCaddyFromLocalStorage();
        if(caddy)
        {
          caddy.items.delete(id);
        }
      this.myCaddy = caddy;

      this.saveCaddyOnlocalStorage();
    }

  // Methode qui permet de recuperer le panier actuel du localStorage
  /*
    getCurrentCady() : Caddy | any
    {
      let caddy=this.caddies.get(this.currentCaddyName);
      if(caddy)
      return caddy;

    }
  */

    //---------------------      ici      ----------------------------------------------
  
  public getTotal():number
  {
        let total=0;
        this.myCaddy = this.loadCaddyFromLocalStorage()

        let items: IterableIterator<ProductItem>= this.myCaddy.items.values();

        for( let pi of items)
        {
          total += pi.price*pi.quantity;
        }

        return total;
  }

  setClient(client: Client) {
    
    this.loadCaddyFromLocalStorage().client=client;
    this.saveCaddyOnlocalStorage();
    
  }

   
}

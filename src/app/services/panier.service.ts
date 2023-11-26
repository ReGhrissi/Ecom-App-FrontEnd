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

//--------------------------------------------------- save Caddy --------------------------------------
public saveUserCaddyOnlocalStorage()
{
  
  if (this.myCaddy)
  {
    
      const productsInCaddy : ProductItem[] = [];

      let items :IterableIterator<ProductItem> = this.myCaddy.items.values()

        for( let i of items)
        {
          productsInCaddy.push(i);     
        }
    
      localStorage.setItem("monPanier_"+this.authenticationService.userAuthenticated.email+"_",JSON.stringify(productsInCaddy));

      this.loadUserCaddyFromLocalStorage();
  }    
}

               //********************************************************************* */

public saveGuestCaddyOnlocalStorage()
{
  
  if (this.myCaddy)
  {
    
  const productsInCaddy : ProductItem[] = [];

   let items :IterableIterator<ProductItem> = this.myCaddy.items.values()

      for( let i of items)
      {
        productsInCaddy.push(i);     
      }

      localStorage.setItem("Panier_GUEST",JSON.stringify(productsInCaddy));
      
      this.loadGuestCaddyFromLocalStorage();

  }

  
}

//------------------------------------------------------ load --------------------------------------------------
  public loadUserCaddyFromLocalStorage() : Caddy
  {
        let productsFromCaddy : ProductItem[] = [];

              let productsUserCaddy =localStorage.getItem("monPanier_"+this.authenticationService.userAuthenticated.email+"_");

                console.log ("les produis from panier :"+ productsUserCaddy)

                if(productsUserCaddy != null)
                {
                  this.myCaddy = this.loadGuestCaddyFromLocalStorage();

                  productsFromCaddy = JSON.parse(productsUserCaddy)

                    for (let pFC of productsFromCaddy)
                    {
                      this.myCaddy.items.set(pFC.id,pFC)
                    }

                    return this.myCaddy;
                }

                else
                {
                   this.myCaddy = this.loadGuestCaddyFromLocalStorage();
                   this.saveUserCaddyOnlocalStorage()
                   return this.myCaddy;
                } 

  } 

              /*************************************************************************** */

  public loadGuestCaddyFromLocalStorage() : Caddy
  {
        let productsFromCaddy : ProductItem[] = [];

              let productsGuestCaddy =localStorage.getItem("Panier_GUEST");
                                
              if(productsGuestCaddy)
              {
                productsFromCaddy = JSON.parse(productsGuestCaddy)

                    for (let pFC of productsFromCaddy)
                    {
                      this.myCaddy.items.set(pFC.id,pFC)
                    }      
              }
             
              return this.myCaddy;      
  }

// ------------------------------------------------------- add product ------------------------------------------
      public addUserProduct(product:Product)
      {
        let q=product.quantity;

          this.addUserProductToCaddy(product.id,product.productId,product.name,product.currentPrice,product.quantity)
          this.saveUserCaddyOnlocalStorage();
          
          product.quantity=q;
          this.addGuestProduct(product);
      }

      public addGuestProduct(product:Product)
      {
          this.addGusetProductToCaddy(product.id,product.productId,product.name,product.currentPrice,product.quantity)
          this.saveGuestCaddyOnlocalStorage();

      }

  // Methode qui permet d'ajouter un produit dans le panier
      public addUserProductToCaddy(id:number,productId:string,name:string,price:number,quantity:number):void // remplacer product:Product
      {
        
                  this.myCaddy= this.loadUserCaddyFromLocalStorage();

                  let caddy= this.myCaddy;
                  
                  if(caddy)
                  {
                     let item=caddy.items.get(id);

                        if(item===undefined) 
                        {
                          item=new ProductItem();
                            item.id=id;
                            item.productId=productId
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

          /********************************************************************************* */

      public addGusetProductToCaddy(id:number,productId:string,name:string,price:number,quantity:number):void // remplacer product:Product
      {
          
                    this.myCaddy= this.loadGuestCaddyFromLocalStorage();
  
                    let caddy= this.myCaddy;
                    
                    if(caddy)
                    {
                       let item=caddy.items.get(id);

                          if(item===undefined) 
                          {
                            item=new ProductItem();
                              item.id=id;
                              item.productId=productId
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


//---------------------------------------   remove product    --------------------------------------

    public removeUserProduct(id:number):void
    {
      let caddy=this.loadUserCaddyFromLocalStorage();
        if(caddy)
        {
          caddy.items.delete(id);
        }
      this.myCaddy = caddy;

      this.saveUserCaddyOnlocalStorage();
      this.removeGusetProduct(id);
    }

    
    public removeGusetProduct(id:number):void
    {
      let caddy=this.loadGuestCaddyFromLocalStorage();
        if(caddy)
        {
          caddy.items.delete(id);
        }
      this.myCaddy = caddy;

      this.saveGuestCaddyOnlocalStorage();
    }

//----------------------------------------------    ici      ----------------------------------------------
  
  public getUserTotal():number
  {
        let total=0;
        this.myCaddy = this.loadUserCaddyFromLocalStorage()

        let items: IterableIterator<ProductItem>= this.myCaddy.items.values();

        for( let pi of items)
        {
          total += pi.price*pi.quantity;
        }

        return total;
  }

  public getGuestTotal():number
  {
        let total=0;
        this.myCaddy = this.loadGuestCaddyFromLocalStorage()

        let items: IterableIterator<ProductItem>= this.myCaddy.items.values();

        for( let pi of items)
        {
          total += pi.price*pi.quantity;
        }

        return total;
  }

//-----------------------------------------------------------------------------------------------------
  setClient(client: Client) {
    
    this.loadUserCaddyFromLocalStorage().client=client;
    this.saveUserCaddyOnlocalStorage();
    
  }

   
}

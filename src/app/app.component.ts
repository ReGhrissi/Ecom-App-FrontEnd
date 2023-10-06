import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { AuthentificationService } from './services/authentification.service';
import { CatalogueService } from './services/catalogue.service';
//import { CaddyService } from './services/caddy.service';
import { PanierService } from './services/panier.service';
import { CaddyComponent } from './caddy/caddy.component';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Ecommerce-Front';

  categories:any;
  public currentCategory :any;

  constructor (private catService:CatalogueService, 
               private router:Router,
               public authService:AuthentificationService,
               public panierService:PanierService,
               public caddyComponent :CaddyComponent

               ) { }

  ngOnInit(): void {
    
        initFlowbite();

    this.authService.loadAuthUserFromLocalStorage();
    this.getCategories();
/**
    if(this.authService.isAuthenticated) 
    {
      this.caddyComponent.getUserCaddy()
    }

    else
    {
      this.caddyComponent.getGuestCaddy()
    }
 */  

  }

  // methode qui permet la recuperation des categories
      private getCategories()
      {
          this.catService.getRessource("/categories")
              .subscribe({
                  next: data => {this.categories=data;},
                  error: err => console.error(err)
              });
      }
    
  // methode qui permet la recupération des produits selon la catégorie séléctioné
      getProductsByCat(c :any)
      {
          this.currentCategory=c;
          this.router.navigateByUrl('/products/2/'+c.id);
      }
  
  // methode qui permet la recupération des produits à l'etat Séléctioné
  onSelectedProducts()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/1/0")
  }

  // methode qui permet la recupération des produits à l'etat Promo
  OnProductsPromo()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/3/0")

  }

  // methode qui permet la recupération des produits à l'etat Disponiple
  onProductsDispo()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/4/0")
  }

  // methode qui permet de faire un LogOut (suppression du tocken)
  onLogout()
  {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }

  // methode qui permet de faire un LogOut (suppression du tocken)
  onLogin()
  {
    this.router.navigateByUrl('/login');
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location} from '@angular/common';


import { AuthentificationService } from './services/authentification.service';
import { CatalogueService } from './services/catalogue.service';
//import { CaddyService } from './services/caddy.service';
import { PanierService } from './services/panier.service';
import { CaddyComponent } from './caddy/caddy.component';
import { initFlowbite } from 'flowbite';
import { TokenService } from './services/token.service';
import { AccountService } from './services/account.service';
import { Icons } from './_Plugins/icons.model';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

 icons: Icons = new Icons();

 myBack = this.icons.myBack;

  title = 'Ecommerce-Front';

  categories:any;
  totalProductsByCategory: { [key: string]: number } = {};
  public currentCategory :any;

  constructor (private catService:CatalogueService, 
               private router:Router,
               private activeRoute:ActivatedRoute,
               public authService:AuthentificationService,
               public panierService:PanierService,
               public caddyComponent :CaddyComponent,
               private tokenService:TokenService,
               private accountService : AccountService,
               private location: Location

               ) { }

  ngOnInit(): void {
    
        initFlowbite();

      if(this.tokenService.loggedIn())
      {
        this.authService.loadAuthUserFromLocalStorage();
      }
      
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

                  next: data => {
                    
                      this.categories=data;
                      
                      // Récupérer le nombre total d'articles pour chaque catégorie
                      this.categories.forEach((category:any) => {

                          this.catService.getTotalProductsCountByCategory(category.categoryId)
                              .subscribe((count: any) => 
                              {
                                  this.totalProductsByCategory[category.categoryId] = count;
                                  
                              });
                        });
                  
                  },
                  error: err => console.error(err)
              });
      }
    
  // methode qui permet la recupération des produits selon la catégorie séléctioné
  getProductsByCat(c :any)
  {
          this.currentCategory=c;
          this.router.navigateByUrl('/products/2/'+c.categoryId).then((result) =>{
            window.location.reload(); 
          });
  }
  
  // methode qui permet la recupération des produits à l'etat Séléctioné
  onSelectedProducts()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/1/0").then((result) =>{
      window.location.reload(); 
    })
  }

  // methode qui permet la recupération des produits à l'etat Disponiple
  onProductsDispo()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/4/0").then((result) =>{
      window.location.reload(); 
    })
  }

  OnAllProducts()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/all/p").then((result) =>{
      window.location.reload(); 
    })
  }

  // methode qui permet la recupération des produits à l'etat Promo
  OnProductsPromo()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/3/0").then((result) =>{
      window.location.reload(); 
    })
  }

  OnProductsNew()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/5/0").then((result) =>{
      window.location.reload(); 
    })
  }

  OnProductsTendancy()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/4/0").then((result) =>{
      window.location.reload(); 
    })
  }

  OnProductsFutur()
  {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/6/0").then((result) =>{
      window.location.reload(); 
    })
  }

  // methode qui permet de faire un LogOut (suppression du tocken)
  onLogout()
  {
      this.authService.onLogout();

      Swal.fire({
        position: "bottom-end",
        icon: "info",
        title: "Vous êtes déconnectés !",
        showConfirmButton: false,
        timer: 2000
      });
      
  }

  // methode qui permet de faire un LogOut (suppression du tocken)
  onLogin()
  {
    this.router.navigateByUrl('/login');
  }

  onJumpToSection(section : any)
  {
      document.getElementById(section)?.scrollIntoView({behavior:'smooth'})
  }

}

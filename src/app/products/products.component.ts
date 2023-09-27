import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthentificationService } from '../services/authentification.service';
import { CatalogueService } from '../services/catalogue.service';

import { Product } from '../_Model/product.model';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products :any;
  public currentProduct : any;

  
  public selectedFiles : any;

  public currentFileUpload : any;

  
  timeStamp:number=0;

  public editPhoto?:boolean;
  public title?:string;
  public progress?:any;

  constructor(public catService:CatalogueService, 
              private route:ActivatedRoute, 
              private router:Router,
              public authService:AuthentificationService,
              public panierService:PanierService

               
              ) {}

  ngOnInit(): void {
    
    this.router.events.subscribe((val) =>{
                if(val instanceof NavigationEnd)
                {
                    let url =val.url;
                  // console.log(url);
                    let p1=this.route.snapshot.params['p1'];
    
                    // Cas de navigation possibles 
                    if(p1==1)
                    {
                      this.title="Les produits sélectionés";
                      this.getProducts('/products/search/selectedProducts');
                    }
                    else if(p1==2)
                    {
                      
                      let idCat=this.route.snapshot.params['p2'];

                      this.title="Produits de la catégorie "+idCat;
                      this.getProducts('/categories/'+idCat+'/products');
                    }
                    else if(p1==3)
                    {
                      this.title="Les produits en promotion"; 
                      this.getProducts('/products/search/promoProducts');
                    }
                    else if(p1==4)
                    {
                      this.title="Les produits disponibles";
                      this.getProducts('/products/search/dispoProducts');
                    }
                  }
                }
    );

    let p1=this.route.snapshot.params['p1'];
  
    if(p1==1)
    {
      //this.title="Les produits sélectionés";
      this.getProducts('/products/search/selectedProducts');
    }
    
  }

  // Methode qui permet de recuperer les produits
  private getProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.products=data;},
          error: err => console.error(err)
      });
  }

  onEditPhoto(p :any)
  {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event :any)
  {
    this.selectedFiles=event.target.files;

  }

  // Methode qui permet de faire un Upload de la photo du produit
  uploadPhoto()
  {
    this.progress= "0 %";

    this.currentFileUpload = this.selectedFiles.item(0)

    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id)
    .subscribe({

      next: event=>
                  {
                    if(event.type === HttpEventType.UploadProgress && event.total !== undefined)
                    {
                        this.progress = Math.round(100 * event.loaded / event.total)+" %";
                    }
                    else if(event instanceof HttpResponse)
                    {
                      // alert("Chargement avec succès !");
                        this.timeStamp=Date.now();
                    }

                  },
      
      error:  err=>
                  {
                    alert("Problème de chargement !");
                    
                    this.selectedFiles =undefined;
                  }
              });
    
  }


  getTS()
  {

    return this.timeStamp;
  }

  public isAdmin() : boolean
  {
    return this.authService.isAdmin();
  }

  // Methode qui permet de faire une redirection vers le detail du produit
    onProductDetails(p:Product)
    {
        let url=btoa(p._links.product.href);
        this.router.navigateByUrl("product-detail/"+url);
    }

  // Methode qui permet d'ajouter un produit au panier
    onAddProductToCaddy(p:Product)
    {
      /**
          if(!this.authService.isAuthenticated)
          {
            this.router.navigateByUrl("/login");
          }
      */
          this.panierService.addProduct(p);
    
    }

}

import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { tick } from '@angular/core/testing';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AuthentificationService } from '../services/authentification.service';
import { CatalogueService } from '../services/catalogue.service';

import { Product } from '../_Model/product.model';
import { PanierService } from '../services/panier.service';

import { faBullhorn, faCartPlus, faCheckCircle, faSplotch } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';
import { Icons } from '../_Plugins/icons.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  icons :Icons = new Icons();

  myAddToCart = this.icons.myAddToCart;
  myAvailable= this.icons.myAvailable;
  myNewPr = this.icons.myNewPr;
  myNew = this.icons.myNew;
  myPromo = this.icons.myPromo;

  public products :any;
  public allProducts :any;
  public currentProduct : any;

  public mode :number =0;
  
  public selectedFiles : any;

  public currentFileUpload : any;

  
  timeStamp:number=0;

  public editPhoto?:boolean;
  public title?:string;
  public progress?:any;

  constructor(public catService:CatalogueService, 
              public route:ActivatedRoute, 
              private router:Router,
              public authService:AuthentificationService,
              public panierService:PanierService

               
              ) {
                /*
                this.router.events.subscribe(event => {
                  if (event instanceof NavigationEnd) {
                    console.log('URL actuelle :', event.url);
                   
                  }
                });

                this.route.url.subscribe(segments => {
                  // segments est un tableau d'objets, chaque objet représentant un segment de l'URL
                  const url = segments.map(segment => segment.path).join('/');
                  console.log('URL actuelle 1 :', "/"+url);
                  this.currentRoute="/"+url
                });
                */
              }

      p1:any;
      idCat:any;

      currentRoute : any;
      searchString : any;

  ngOnInit(): void {

    this.title="Tous les produits";
    this.getProducts('/products');

    this.route.params.subscribe((data)=>
     {              
            this.p1 = +data['p1']
            this.idCat=+data['p2']

                        if(this.p1==1)
                        {
                          
                          this.title="Les produits sélectionés";
                          this.getProducts('/products/search/selectedProducts');
                        }
                        else if(this.p1==2)
                        {
                          
                          //let idCat=this.route.snapshot.params['p2'];

                          
                          this.title="Produits de la catégorie "+this.idCat;
                          this.getProducts('/categories/'+this.idCat+'/products');
                        }
                        else if(this.p1==3)
                        { 
                          
                          this.title="Les produits en promotion"; 
                          this.getProducts('/products/search/promoProducts');
                        }
                        else if(this.p1==4)
                        {
                          
                          this.title="Les produits disponibles";
                          this.getProducts('/products/search/dispoProducts');
                        }
    
 
                      } );
    


/** 
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
        
      // this.mode=0;
        let p1=this.route.snapshot.params['p1'];
      
        if(p1==1)
        {
          
          //this.title="Les produits sélectionés";
          this.getProducts('/products/search/selectedProducts');
        }
        */
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
/*
  public isAdmin() : boolean
  {
    return this.authService.isAdmin();
  }
*/
  // Methode qui permet de faire une redirection vers le detail du produit
    onProductDetails(p:Product)
    {
        let url=btoa(p._links.product.href);
        this.router.navigateByUrl("product-detail/"+url);
    }
///-------------------------------------------------------------------------------------------
    onFilter(value: string)
    {
      //console.log(value)
      this.router.navigate(['/products'], { queryParams: {search: value}});

     // this.route.queryParams.subscribe((data)=> {
     //   this.searchString = data['search']

    //  if(this.searchString === undefined || this.searchString ==='' || this.searchString === null)
     // {
       // this.router.navigate([this.currentRoute]);
     //  console.log("1111111111111111111")
     // }
      if (value == "enPromotion" && this.products != undefined)
      {
        
        this.products = this.products._embedded.products.filter((product :any) => product.promotion)
        //this.products=null
        console.log("222222222222222222222 :"+ this.products)
        
      }
      else
      {
      console.log("3333333333")
      }
      
    }

}

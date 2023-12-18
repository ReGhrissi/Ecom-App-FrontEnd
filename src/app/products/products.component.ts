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
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  icons :Icons = new Icons();

  myAddToCart = this.icons.myAddToCart;
  myTendancy= this.icons.myTendancy;
  myNewPr = this.icons.myNewPr;
  myNew = this.icons.myNew;
  myPromo = this.icons.myPromo;
  myFutur=this.icons.myFutur
  myProdManage=this.icons.myProdManage
  myCatManage=this.icons.myCatManage
  myAngle= this.icons.myAngle;
  myAngleLeft =this.icons.myAngleLeft;
  mySearch=this.icons.mySearch
  mySearch2=this.icons.mySearch2
  myCancel=this.icons.myCancel

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
      all:any;
      idCat:any;
      currentCat:any
      productsByCat :boolean = false;

      currentRoute : any;
      searchString : any;

      totalProducts: any; // Nombre total de produits
      limitPerPage = 20; // Limite par page
      totalPageCount: number[] = []; // Tableau pour stocker les numéros de page
      lastPage:any;
      firstPage=1;

      currentPage = 1;
      KeyWord:any;
      searchMode :any;
    
  ngOnInit(): void {

      this.searchMode = false;
      //this.currentPage=1;

      this.route.params.subscribe((data)=>

      {      
            this.p1 = +data['p1'];
            this.idCat = data['p2'];
            this.all=data['p1'];
            
                        if(this.all=='all')
                        {
                          this.title="Tous les produits";
                          this.productsByCat=false;
                          this.getProducts('/products');
                          this.getTotalProductsCount("/products/totalProductsCount");
                          this.currentPage=1;
                          
                          //window.location.reload();
                        }
                        else if(this.p1==1)
                        {  
                          this.title="Les produits sélectionés";
                          this.getProducts('/products/selectedProducts');
                          this.getTotalProductsCount("/products/totalSelectedProductsCount");
                          this.currentPage=1;
                        }
                        else if(this.p1==2)
                        {

                          this.productsByCat=true;
                          this.catService.getRessource("/categories/"+this.idCat)
                                  .subscribe({
                                      next: data => {
                                                      this.currentCat=data;
                                                      this.title="Produits de la catégorie  " +this.currentCat.name;
                                                    },
                                      error: err => console.error(err)
                                  }); 

                          
                          this.getProducts('/products/productsByCat/'+this.idCat);
                          this.getTotalProductsCount("/products/totalProductsCountByCat/"+this.idCat);
                          this.currentPage=1;
                        }
                        else if(this.p1==3)
                        {       
                          this.title="Les produits en promotion"; 
                          this.productsByCat=false;
                          this.getProducts('/products/promoProducts');
                          this.getTotalProductsCount("/products/totalPromoProductsCount");
                          this.currentPage=1;
                        }
                        else if(this.p1==4)
                        {  
                          this.title="Les produits tendances";
                          this.productsByCat=false;
                          this.getProducts('/products/tendancyProducts');
                          this.getTotalProductsCount("/products/totalTendancyProductsCount");
                          this.currentPage=1;
                        }
                        
                        else if(this.p1==5)
                        {  
                          this.title="Les nouveaux produits";
                          this.productsByCat=false;
                          this.getProducts('/products/newProducts');
                          this.getTotalProductsCount("/products/totalNewProductsCount");
                          this.currentPage=1;
                        }

                        else if(this.p1==6)
                        {  
                          this.title="Prochainement dans nos stocks";
                          this.productsByCat=false;
                          this.getProducts('/products/futurProducts');
                          this.getTotalProductsCount("/products/totalFuturProductsCount");
                          this.currentPage=1;
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
          next: data => {
                          this.products=data;

                          // this.products.sort((a:any, b:any) => {
                                        
                          //   const dateA = new Date(a.creationDate);
                          //   const dateB = new Date(b.creationDate);
                            
                          //   if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                             
                          //     return 0;
                          //   }
                          
                          //   return dateB.getTime() - dateA.getTime();
                          // });  
                        },
          error: err => console.error(err)
      });
}

onAllProducts()
{
  this.route.params.subscribe((data)=>
    {      
          this.p1 = +data['p1'];

          if(this.p1==2)
          {
              this.router.navigateByUrl('/products/2/'+this.idCat).then((result) =>{
                window.location.reload(); 
              })
          }
          else
          {
              this.router.navigateByUrl('/products/all/p').then((result) =>{
                window.location.reload(); 
              })
          }
    })

}
//-------------------------------------------------------------------------------------------

searchForm = new FormGroup ({

  keyword: new FormControl('',[Validators.required])

});

onSearchProducts()
{
    this.KeyWord  = this.searchForm.get('keyword')?.value || '' ;

    this.route.params.subscribe((data)=>
    {      
          this.p1 = +data['p1'];
          this.idCat = data['p2'];

          if(this.p1==2)
          {

              this.getTotalProductsCount("/products/totalProductsCountByCategoryAndKeyword/"+this.idCat+"/"+this.KeyWord);

              let url = "/products/search/"+this.idCat+"/"+this.KeyWord;
          
              this.getProducts(url);

          }
          else
          {
            
              this.getTotalProductsCount("/products/totalProductsCountByKeyword/"+this.KeyWord);

              let url = "/products/search/"+this.KeyWord;

              this.getProducts(url);
            
          }
          
    })

    this.title="Résultat de la recherche par :  " +this.KeyWord;

    this.searchMode = true;
    this.currentPage=1
}
//---------------------------------------------------------------------------------------------------
getTotalProductsCount(url :any)
{
    this.catService.getTotalRessourceCount(url)
      .subscribe({
          next: count  => {
                              this.totalProducts = count; // Récupère le nombre total de produits
                              console.log("nombre des prod :" ,this.totalProducts )
                              this.calculateTotalPages(); // Calcule le nombre total de pages
                        },
          error: err => console.error(err)
      });
}

calculateTotalPages() 
{
    const pages = Math.ceil(this.totalProducts / this.limitPerPage);

    this.totalPageCount = Array.from({ length: pages }, (_, i) => i + 1);
    console.log("this.totalPageCount :"+ this.totalPageCount)
}



 getPageNumbers(): (number | string) [] 
 {
      const pageNumbers: (number | string)[] = [];

      if (this.totalPageCount.length <= 5) 
      {
        pageNumbers.push(...this.totalPageCount);
        this.lastPage = this.totalPageCount.length;
      } 
      else 
      {
            const currentPage = this.currentPage;
            const lastPage = this.totalPageCount[this.totalPageCount.length - 1];

            this.lastPage = lastPage;

            if (currentPage <= 3) 
            {
              pageNumbers.push(1, 2, 3, '...', lastPage);
            } 

            else if (currentPage >= lastPage - 2) 
            {
              pageNumbers.push(1, '...', lastPage - 2, lastPage - 1, lastPage);
            } 

            else 
            {
              pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', lastPage);
            }
      }

      return pageNumbers;
}

loadProductsByPage(pageNumber: number) 
{

  this.route.params.subscribe((data)=>

  {      
         this.p1 = +data['p1'];
         this.idCat = data['p2'];
         this.all=data['p1'];
         
         if(this.searchMode == true)
         {
                  if(this.p1==2)
                  {
                      this.getProducts('/products/search/'+this.idCat+"/"+this.KeyWord+'?page='+pageNumber);
                  }
                  else
                  {
                      this.getProducts("/products/search/"+this.KeyWord+'?page='+pageNumber);  
                  }
                   
         }
         else
         {
                  if(this.all=='all')
                  {
                    this.getProducts('/products?page='+pageNumber);   
                  //  this.currentPage = pageNumber;
                  // window.scrollTo({ top: 200, behavior: 'smooth' });
                  }
                  else if(this.p1==1)
                  {  
                    this.getProducts('/products/selectedProducts?page='+pageNumber);
                  }
                  else if(this.p1==2)
                  {

                    this.getProducts('/products/productsByCat/'+this.idCat+'?page='+pageNumber);
                  }
                  else if(this.p1==3)
                  {       
                    this.getProducts('/products/promoProducts?page='+pageNumber);
                  }
                  else if(this.p1==4)
                  {  
                    this.getProducts('/products/tendancyProducts?page='+pageNumber);
                  }
                  
                  else if(this.p1==5)
                  {  
                    this.getProducts('/products/newProducts?page='+pageNumber);
                  }

                  else if(this.p1==6)
                  {  
                    this.getProducts('/products/futurProducts?page='+pageNumber);
                  }
         }


      } );

      this.currentPage = pageNumber;
      window.scrollTo({ top: 200, behavior: 'smooth' });
}

loadNextPage() 
{
  if (this.currentPage < this.totalPageCount.length) {
    const nextPage = this.currentPage + 1;
    this.loadProductsByPage(nextPage);
  }
}

loadPreviousPage() 
{
  if (this.currentPage > 1) {
    const previousPage = this.currentPage - 1;
    this.loadProductsByPage(previousPage);
  }
}

isPageActive(pageNum: number | string): boolean 
{
  return pageNum === this.currentPage;
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
    onProductDetails(p:any)
    {
        this.router.navigateByUrl("product-detail/"+p.productId);
    }
//-------------------------------------------------------------------------------------------
    onFilter(value: string)
    {
      
      this.router.navigate(['/products/2/'+this.idCat], { queryParams: {search: value}});

      if (value == "All")
      {
        
        this.getProducts('/products/productsByCat/'+this.idCat);
        this.getTotalProductsCount("/products/totalProductsCountByCat/"+this.idCat);
        this.currentPage=1;
        
      }
      else if (value == "promotionProducts")
      {
        
        this.getProducts('/products/promotionProductsByCat/'+this.idCat);
        this.getTotalProductsCount("/products/totalPromotionProductsCountByCat/"+this.idCat);
        this.currentPage=1;
        
      }
      else if (value == "newProducts")
      {
        this.getProducts('/products/newProductsByCat/'+this.idCat);
        this.getTotalProductsCount("/products/totalNewProductsCountByCat/"+this.idCat);
        this.currentPage=1;
      }
      else if (value == "tendancyProducts")
      {
        this.getProducts('/products/tendancyProductsByCat/'+this.idCat);
        this.getTotalProductsCount("/products/totalTendancyProductsCountByCat/"+this.idCat);
        this.currentPage=1;
      }
      else if (value == "futurProducts")
      {
        this.getProducts('/products/futurProductsByCat/'+this.idCat);
        this.getTotalProductsCount("/products/totalFuturProductsCountByCat/"+this.idCat);
        this.currentPage=1;
      }
      
    }

}

import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { Icons } from '../_Plugins/icons.model';
import { Product } from '../_Model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api'; 
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  icons :Icons = new Icons();

  myAvailable= this.icons.myAvailable;
  myNewPr = this.icons.myNewPr;
  myPromo = this.icons.myPromo;
  myTendancy =this.icons.myTendancy
  myFutur=this.icons.myFutur;
  myGoTo = this.icons.myGoTo
  myCatManage = this.icons.myCatManage;
  myAngle= this.icons.myAngle;
  myAngleLeft =this.icons.myAngleLeft; 
  myProdManage=this.icons.myProdManage

  selectedProducts :any;
  promoProducts :any;
  tendancyProducts : any;
  newProducts:any;
  futurProducts:any;

  categories:any;

  timeStamp:number=0

  products:any;
  title:any;
  totalProducts: any; // Nombre total de produits
  limitPerPage = 20; // Limite par page
  totalPageCount: number[] = []; // Tableau pour stocker les numéros de page
  lastPage:any;
  firstPage=1

  currentPage = 1;
  KeyWord:any;
  searchMode :any;

  constructor(private http:HttpClient, public catService:CatalogueService, private router:Router, private activeRoute :ActivatedRoute)
  {}

  ngOnInit(): void {

    this.searchMode = false;

    this.getSelectedProducts('/products/selectedProducts');

    this.getNewProducts('/products/newProducts');

    this.getFuturProducts('/products/futurProducts');

    this.getPromoProducts('/products/promoProducts');

    this.getDispoProducts('/products/tendancyProducts');

   this.catService.getRessource("/categories").subscribe((categories: any) => {

      this.categories = categories;

    });


    this.activeRoute.fragment.subscribe((data)=>{
        this.jumpToSection(data);
    });

  }


 private getSelectedProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.selectedProducts=data;},
          error: err => console.error(err)
      });
  }

  private getNewProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.newProducts=data;},
          error: err => console.error(err)
      });
  }

  private getFuturProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.futurProducts=data; console.log('futur prod :'+this.futurProducts)},
          error: err => console.error(err)
      });
  }

  private getPromoProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.promoProducts=data;},
          error: err => console.error(err)
      });
  }

  private getDispoProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.tendancyProducts=data;},
          error: err => console.error(err)
      });
  }

// pour les produits recherchré-----------------------------------------------------------
  private getProducts(url :any)
  {
    this.catService.getRessource(url)
      .subscribe({
          next: data => {this.products=data;},
          error: err => console.error(err)
      });
  }
//-----------------------------------------------------------------------------------------

onAllProducts()
{
  this.router.navigateByUrl('/products/all/p');
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}
onNewProducts()
{
  this.router.navigateByUrl('/products/5/0');
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}
onPromoProducts()
{
  this.router.navigateByUrl('/products/3/0');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
onTendancyProducts()
{
  this.router.navigateByUrl('/products/4/0');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
onProductsByCat(categoryId:any)
{
  this.router.navigateByUrl('/products/2/'+categoryId);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
    // Methode qui permet de faire une redirection vers le detail du produit
    onProductDetails(p:Product)
    {
        this.router.navigateByUrl("product-detail/"+p.productId);
    }

    getTS()
    {
  
      return this.timeStamp;
    }
  
    jumpToSection(section :any)
    {
      document.getElementById(section)?.scrollIntoView({behavior : 'smooth'})
    }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      autoplay:true,
      autoplayTimeout :2000,
      autoplayHoverPause : true,
      animateOut:'fadeOut',
      navSpeed: 600,
      navText: ['<', '>'],
      margin:15,
       
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 5
        }
      },
      
      nav: true
    }
//-------------------------------------------------------------------------------------------

    searchForm = new FormGroup ({

      keyword: new FormControl('',[Validators.required])

    });

    onSearchProducts()
    {
        this.KeyWord  = this.searchForm.get('keyword')?.value || '' ;

        this.title="Résultat de la recherche par :  " +this.KeyWord;

        this.getTotalProductsCount("/products/totalProductsCountByKeyword/"+this.KeyWord);

        let url = "/products/search/"+this.KeyWord;

        this.getProducts(url);

        this.searchMode = true;
    }

//--------------------------------------------------------------------------------
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
               // console.log("last page :" +this.lastPage)
    
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
//------------------------------------------------------------------------------------------------  
    loadProductsByPage(pageNumber:any) 
    {
        this.getProducts("/products/search/"+this.KeyWord+"?page="+pageNumber);  
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
   
}

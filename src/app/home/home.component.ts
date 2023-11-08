import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { Icons } from '../_Plugins/icons.model';
import { Product } from '../_Model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o/public_api'; 
import { HttpClient } from '@angular/common/http';

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

  selectedProducts :any;
  promoProducts :any;
  dispoProducts : any;

  categories:any;

  timeStamp:number=0


  constructor(private http:HttpClient, public catService:CatalogueService, private router:Router, private activeRoute :ActivatedRoute)
  {}

  ngOnInit(): void {

    this.getSelectedProducts('/products/search/selectedProducts');

    this.getPromoProducts('/products/search/promoProducts');

    this.getDispoProducts('/products/search/dispoProducts');

   this.catService.getRessource("/categories").subscribe((categories: any) => {

      this.categories = categories._embedded.categories;

      // Pour chaque catégorie, récupérez les produits associés
      this.categories.forEach((category :any)=> {

            this.http.get(category._links.products.href).subscribe((products: any) => {
              
              category.products = products._embedded.products;
            });
      });
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
          next: data => {this.dispoProducts=data;},
          error: err => console.error(err)
      });
  }


    // Methode qui permet de faire une redirection vers le detail du produit
    onProductDetails(p:Product)
    {
        let url=btoa(p._links.product.href);
        this.router.navigateByUrl("product-detail/"+url);
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
      /* 
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
          items: 4
        }
      },
      */
      nav: true
    }
}

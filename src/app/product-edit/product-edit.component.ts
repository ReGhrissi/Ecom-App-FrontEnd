import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { faTrash, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_Model/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  myDelete=faTrash;
  myEdit=faUserPen;
  myNew=faUserPlus;
  

  public title :any;
  public allProducts:any;

        constructor(public catService:CatalogueService, public router:Router)
        {

        }


  ngOnInit(): void 
  {

    this.title="Gestion des produits";
    this.getAllProducts('/products');
    
  }


  private getAllProducts(url :any)
  {
    
    this.catService.getRessource(url)
      .subscribe({
          next: data => {
            console.log("All Products"+data)
            this.allProducts=data;  
          },
          error: err => console.error(err)
      });
  }

  updateProduct(p:Product)
  {
      let url=btoa(p._links.product.href);
      this.router.navigateByUrl("product-detail/"+url);
  }

}

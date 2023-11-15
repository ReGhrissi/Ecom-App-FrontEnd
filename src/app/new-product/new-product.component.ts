import { Component, Input, OnInit } from '@angular/core';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Category } from '../_Model/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

 

  icons :Icons = new Icons();

  myNew=this.icons.myNew;
  myCancel=this.icons.myCancel;

  categories:any;
  newProduct:any;
  idCat:any;

  newProductForm = new FormGroup ({

    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    price: new FormControl('',[Validators.required]), 
    currentPrice: new FormControl('',[Validators.required]), 
    categoryId: new FormControl('',[Validators.required]), 
    
  });

  constructor(public catService:CatalogueService, private router:Router, 
              private route:ActivatedRoute, private location:Location)
  {}
  
  ngOnInit(): void {


    this.catService.getRessource("/categories") 
          .subscribe({
              next: (data) => {this.categories=data;console.log("all categories:"+data)},
              error: err => console.error(err)
          });

    }

  onBack()
  {
    this.location.back();
  }
  
  onNewProduct()
  {

    const name = this.newProductForm.get('name')?.value || '' ;
    const description = this.newProductForm.get('description')?.value || '' ;
    const price = this.newProductForm.get('price')?.value || '' ;
    const currentPrice = this.newProductForm.get('currentPrice')?.value || '' ;
    const categoryId = this.newProductForm.get('categoryId')?.value || '' ;


    this.catService.postRessource("/products/"+categoryId, { name, description, price, currentPrice}).pipe(

      catchError(err => {
                        console.log(err);
        throw err;
      })
      ).subscribe((data:any)=> {

        //  console.log("Retour de New Product :"+data)
          this.newProduct =data;
          this.router.navigateByUrl('/product-edit/'+this.newProduct.productId)    
         //   this.newProduct.id = data['id'];
          //    console.log("ID commande apres submit :"+this.newProduct.id)

        });
  }

}

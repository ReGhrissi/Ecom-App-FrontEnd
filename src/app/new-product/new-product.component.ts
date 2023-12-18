import { Component, Input, OnInit } from '@angular/core';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Category } from '../_Model/category.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit{

 

  icons :Icons = new Icons();

  myNew=this.icons.myNew;
  myCancel=this.icons.myCancel;
  myProduct=this.icons.myProdManage;
  myDesc=this.icons.myDesc;
  myCat=this.icons.myCatManage

  categories:any;
  newProduct:any;
  idCat:any;

  newProductForm = new FormGroup ({

    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    details: new FormControl('',[Validators.required]),
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
    const details = this.newProductForm.get('details')?.value || '' ;
    const categoryId = this.newProductForm.get('categoryId')?.value || '' ;


    this.catService.postRessource("/products/"+categoryId, { name, description, details}).pipe(

      catchError(err => {
                        console.log(err);

                        Swal.fire({
                          position: "top-end",
                          icon: "error",
                          title: "Erreur : "+err.status,
                          text:"",
                          showConfirmButton: false,
                          timer: 2000
                        });
        throw err;
      })
      ).subscribe((data:any)=> {

        //  console.log("Retour de New Product :"+data)
          this.newProduct =data;

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "",
            text:"",
            showConfirmButton: false,
            timer: 2000
          });

          setTimeout(() => 
          {
            this.router.navigateByUrl('/product-edit/'+this.newProduct.productId) 
            
          }, 1500);
      
           
         //   this.newProduct.id = data['id'];
          //    console.log("ID commande apres submit :"+this.newProduct.id)

        });
  }

}

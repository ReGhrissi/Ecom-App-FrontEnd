import { Component, Input, OnInit } from '@angular/core';
import { Icons } from '../_Plugins/icons.model';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Category } from '../_Model/category.model';

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
  url:any;

  constructor(public catService:CatalogueService, private router:Router, private route:ActivatedRoute)
  {
      
  }
  ngOnInit(): void {

    this.url = atob(this.route.snapshot.params['url']);
    console.log("my URL :"+this.url)

    this.catService.getRessource("/categories") 
          .subscribe({
              next: (data) => {this.categories=data;console.log("all categories:"+data)},
              error: err => console.error(err)
          });

    }

  onNewProduct(f:any)
  {

    this.catService.postRessource("/products",f).pipe(

      catchError(err => {
        console.log(err);

        throw err;

      })
    ).subscribe((data:any)=> {

          console.log("Retour de New Product :"+data)

      this.newProduct =data;
      this.router.navigateByUrl('/categories')
            
            this.newProduct.id = data['id'];
              console.log("ID commande apres submit :"+this.newProduct.id)
    
             
           
 
    });
  }


}

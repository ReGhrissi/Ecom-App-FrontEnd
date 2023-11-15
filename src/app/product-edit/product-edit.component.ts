import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { faTrash, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_Model/product.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs';
import { Location } from '@angular/common';
import { Icons } from '../_Plugins/icons.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  icons :Icons =new Icons();

  myDelete=faTrash;
  myEdit=faUserPen;
  myNew=faUserPlus;
  myUpload=this.icons.myUpload;
  myCancel=this.icons.myCancel;
  

  public title :any;
  public allProducts:any;
  idProduct:any;
  currentProduct:any
  public editProduct: boolean =false;
  selectedFiles : any ;
  progress:any;
  currentFileUpload: any;
  public timeStamp : any;

        constructor(public catService:CatalogueService, public router:Router,
                   private activeRoute :ActivatedRoute, private location:Location)
        {

        }

  editProductForm :any;

  ngOnInit(): void 
  { 

    this.title="Gestion des produits";
    this.getAllProducts('/products');

    this.activeRoute.params.subscribe((data)=>
    {           
      this.idProduct = data['productId'];

           if(this.idProduct)
           {
              this.catService.getRessource('/products/'+this.idProduct).subscribe({

                next: data => {
                                this.currentProduct=data;

                                if(this.idProduct == this.currentProduct.productId)
                                {
                                      this.editProductForm = new FormGroup ({

                                            name: new FormControl(this.currentProduct.name,[Validators.required]),
                                            description: new FormControl(this.currentProduct.description,[Validators.required]),
                                            price: new FormControl(this.currentProduct.price,[Validators.required]), 
                                            currentPrice: new FormControl(this.currentProduct.currentPrice,[Validators.required]), 
                                  
                                            stock : new FormControl(this.currentProduct.stock,[Validators.required]), 
                                  
                                            promotionProduct : new FormControl(this.currentProduct.promotionProduct,[Validators.required]),
                                            promotionRate : new FormControl(this.currentProduct.promotionRate,[Validators.required]),
                                  
                                            newProduct : new FormControl(this.currentProduct.newProduct,[Validators.required]),
                                            futurProduct : new FormControl(this.currentProduct.futurProduct,[Validators.required]),
                                  
                                            tendancyProduct : new FormControl(this.currentProduct.tendancyProduct,[Validators.required]),
                                            selectedProduct : new FormControl(this.currentProduct.selectedProduct,[Validators.required]),
                                            availableProduct : new FormControl(this.currentProduct.availableProduct,[Validators.required])
                                        
                                      });

                                      this.editProduct =true;
                                }
                                
                              },
                error: err => console.error(err)
              });
              
            }

    })
    
  }

  onBack()
  {
    this.location.back();
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

  onEdit(productId:any)
  {
    this.router.navigateByUrl("/product-edit/"+productId)
  }

  onUpdateProduct()
  {

    const name = this.editProductForm.get('name')?.value || '' ;
    const description = this.editProductForm.get('description')?.value || '' ;
    const price = this.editProductForm.get('price')?.value || '' ;
    const currentPrice = this.editProductForm.get('currentPrice')?.value || '' ;

    const stock = this.editProductForm.get('stock')?.value || '' ;

    const promotionProduct = this.editProductForm.get('promotionProduct')?.value || '' ;
    const promotionRate = this.editProductForm.get('promotionRate')?.value || '' ;

    const newProduct = this.editProductForm.get('newProduct')?.value || '' ;
    const futurProduct = this.editProductForm.get('futurProduct')?.value || '' ; 

    const tendancyProduct = this.editProductForm.get('tendancyProduct')?.value || '' ;
    const selectedProduct = this.editProductForm.get('selectedProduct')?.value || '' ;
    const availableProduct = this.editProductForm.get('availableProduct')?.value || '' ;


    this.catService.putResource("/products/"+this.currentProduct.productId, { name, description, price, currentPrice, stock, promotionProduct, 
                                promotionRate, newProduct, futurProduct, tendancyProduct, selectedProduct, availableProduct}).pipe(

      catchError(err => {
                        console.log(err);
        throw err;
      })
      ).subscribe((data:any)=> {

          this.currentProduct =data;
          this.editProduct =  false; 
          this.location.back();

        });
  }



  getTS()
  {
    return this.timeStamp;
  }

  uploadPhoto(event : any)
  {
        this.selectedFiles=event.target.files;

        this.progress= "0 %"; 

        this.currentFileUpload = this.selectedFiles.item(0)

        this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.productId).subscribe({

              next: event=>
                          {
                              if(event.type === HttpEventType.UploadProgress && event.total !== undefined)
                              {
                                  this.progress = Math.round(100 * event.loaded / event.total)+" %";
                              }
                              else if(event instanceof HttpResponse)
                              {
                                  this.timeStamp=Date.now(); 
                              }
                          },
              error:  err=>
                          {
                            alert("Problème de chargement !");   
                          }                
        });
        
        this.selectedFiles =undefined;
    
  }
}

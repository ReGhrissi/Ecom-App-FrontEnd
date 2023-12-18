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

import Swal from 'sweetalert2';
import { OrderService } from '../services/order.service';

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

  myId=this.icons.myKey
  myImage=this.icons.myImage
  myProduct=this.icons.myProdManage
  myDesc=this.icons.myDesc
  myPrice=this.icons.myPrice
  myStock=this.icons.myStock
  myRate=this.icons.myRate
  myTendancy= this.icons.myTendancy;
  myNewPr = this.icons.myNewPr;
  myPromo = this.icons.myPromo;
  myFutur=this.icons.myFutur
  myAvailable=this.icons.myAvailable
  mySelected=this.icons.myValid
  myAngle=this.icons.myAngle
  myAngleLeft=this.icons.myAngleLeft
  mySearch=this.icons.mySearch
  

  public title :any;
  public allProducts:any;
  idProduct:any;
  currentProduct:any
  public editProduct: boolean =false;
  selectedFiles : any ;
  progress:any;
  currentFileUpload: any;
  public timeStamp : any;


  searchString : any;

  totalProducts: any; // Nombre total de produits
  limitPerPage = 20; // Limite par page
  totalPageCount: number[] = []; // Tableau pour stocker les numéros de page
  lastPage:any;
  firstPage=1;

  currentPage = 1;
  KeyWord:any;
  searchMode :any;

  categoryOfProduct: { [key: string]: string } = {};

        constructor(public catService:CatalogueService, public router:Router,
                   private activeRoute :ActivatedRoute, private location:Location, private orderService :OrderService)
        {

        }

  editProductForm :any;

  ngOnInit(): void 
  { 

    this.searchMode = false;

    this.title="Gestion des produits";
    this.getProducts('/products');
    this.getTotalProductsCount("/products/totalProductsCount");

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
                                            details: new FormControl(this.currentProduct.details,[Validators.required]),
                                            price: new FormControl(this.currentProduct.price,[Validators.required]), 
                                  
                                            stock : new FormControl(this.currentProduct.stock,[Validators.required]), 
                                  
                                            promotionProduct : new FormControl(this.currentProduct.promotionProduct,[Validators.required]),
                                            promotionRate : new FormControl(this.currentProduct.promotionRate,[Validators.required,
                                                                                                              Validators.min(0), Validators.max(1)]),
                                  
                                            newProduct : new FormControl(this.currentProduct.newProduct,[Validators.required]),
                                            futurProduct : new FormControl(this.currentProduct.futurProduct,[Validators.required]),
                                  
                                            tendancyProduct : new FormControl(this.currentProduct.tendancyProduct,[Validators.required]),
                                            selectedProduct : new FormControl(this.currentProduct.selectedProduct,[Validators.required]),
                                            availableProduct : new FormControl(this.currentProduct.availableProduct,[Validators.required])
                                        
                                      });

                                      this.editProduct =true;
                                }
                                
                              },
                error: err => {
                      console.error(err)

                      Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Problème de téléchargement du produit  :  "+err.status,
                        showConfirmButton: false,
                        timer: 2000
                      });
                
                }
              });
              
            }

    })
    
  }

  onBack()
  {
    this.location.back();
  }

  private getProducts(url :any)
  {
    
    this.catService.getRessource(url)
      .subscribe({
          next: data => {
            //console.log("All Products"+data)
            this.allProducts=data;
            
            this.allProducts.forEach((product:any) => {

              this.catService.getRessource("/categories/"+product.categoryId)
                    .subscribe((category: any) => 
                    {
                        this.categoryOfProduct[product.categoryId] = category.name;
                        
                    });
              });
          },
          error: err =>  {
            console.error(err)

            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Problème de téléchargement des produits  :  "+err.status,
              showConfirmButton: false,
              timer: 2000
            });
          
          }
      });
  }

  onEdit(productId:any)
  {
    this.router.navigateByUrl("/product-edit/"+productId)
  }

  onDelete(productId:any)
  {
    let isOrdered :any;

        this.orderService.isOrdered(productId)
          .subscribe({
                next: count  => {
                                    isOrdered = count; 
                                },
                error: err => console.error(err)
          });

        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-green-600 text-white active:bg-black hover:bg-green-500 font-bold  text-lg w-32 px-4 py-3 mx-4  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150",
            cancelButton: "bg-rose-600 text-white active:bg-black hover:bg-rose-500 font-bold  text-lg w-32 px-4 py-3 mx-4  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Confirmation !",
          text: "Voulez-vous vraiment supprimer ce produit ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Supprimer",
          cancelButtonText: "Annuler",
          reverseButtons: true
        }).then((result) => {

          if (result.isConfirmed) 
          {
                if(isOrdered == 0)
                {
                      this.catService.deleteResource("/products/"+productId).subscribe({

                        next: event=>
                                    {
                                      swalWithBootstrapButtons.fire({
                        
                                        title: "Supprimé !",
                                        text: "Le produit a été supprimé avec succés.",
                                        icon: "success"
                                      });
                                      //window.location.reload();
                                      this.getProducts('/products');
                                    },
                        error:  err=>
                                    {
                                      
                                      Swal.fire({
                                        position: "top-end",
                                        icon: "error",
                                        title: "Erreur dans la suppression du produit : "+err.status,
                                        showConfirmButton: false,
                                        timer: 3000
                                      }); 
                                    }                
                      
                      });
                
                }
                else
                { 
                  swalWithBootstrapButtons.fire({
                    title: "Suppression bloquée !",
                    text: "Vous ne pouvez pas supprimer un produit déja commandé par un client. Pensez à le désactiver !",
                    icon: "error"
                  });

                }
            
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire({
              title: "Annullée !",
              text: "La suppression du produit a été annullée.",
              icon: "error"
            });
          }
        });


        
  }

  onUpdateProduct()
  {

    const name = this.editProductForm.get('name')?.value || '' ;
    const description = this.editProductForm.get('description')?.value || '' ;
    const details = this.editProductForm.get('details')?.value || '' ;
    const price = this.editProductForm.get('price')?.value || '' ;

    const stock = this.editProductForm.get('stock')?.value || '' ;

    const promotionProduct = this.editProductForm.get('promotionProduct')?.value || '' ;
    const promotionRate = this.editProductForm.get('promotionRate')?.value || '' ;

    const newProduct = this.editProductForm.get('newProduct')?.value || '' ;
    const futurProduct = this.editProductForm.get('futurProduct')?.value || '' ; 

    const tendancyProduct = this.editProductForm.get('tendancyProduct')?.value || '' ;
    const selectedProduct = this.editProductForm.get('selectedProduct')?.value || '' ;
    const availableProduct = this.editProductForm.get('availableProduct')?.value || '' ;


    this.catService.putResource("/products/"+this.currentProduct.productId, { name, description, details,price, stock, promotionProduct, 
                                promotionRate, newProduct, futurProduct, tendancyProduct, selectedProduct, availableProduct}).pipe(

      catchError(err => {
                        console.log(err);
                        Swal.fire({
                          position: "top-end",
                          icon: "error",
                          title: "Erreur de modification  : "+err.status,
                          showConfirmButton: false,
                          timer: 2000
                        });
        throw err;
      })
      ).subscribe((data:any)=> {

          this.currentProduct =data;
          this.editProduct =  false; 
          this.location.back();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Modification réussi !",
            showConfirmButton: false,
            timer: 2000
          });

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

                                  Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "chargement réussi !",
                                    showConfirmButton: false,
                                    timer: 2000
                                  });

                              }

                          
                          },
              error:  err=>
                          {
                            Swal.fire({
                              position: "top-end",
                              icon: "error",
                              title: "Erreur de chargement !",
                              showConfirmButton: false,
                              timer: 2000
                            });   
                          }                
        });
        
        this.selectedFiles =undefined;
    
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
    this.currentPage=1
}

onAllProducts()
{
    this.router.navigateByUrl("/product-edit").then(()=>
    {
      window.location.reload();
    })
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

      this.getProducts('/products?page='+pageNumber);   
                     
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

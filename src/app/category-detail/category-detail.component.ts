import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Icons } from '../_Plugins/icons.model';
import { Location} from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderService } from '../services/order.service';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit{

  icons :Icons = new Icons();

  myDelete=this.icons.myDelete;
  myEdit=this.icons.myEdit;
  myNew=this.icons.myNew;
  myUpload=this.icons.myUpload;
  myCancel=this.icons.myCancel;
  myBack=this.icons.myBack;
  myAngle=this.icons.myAngle
  myAngleLeft=this.icons.myAngleLeft
  mySearch=this.icons.mySearch
  myActive=this.icons.myAvailable
  myDisabled=this.icons.myDeny

  idCat:any;
  currentCategory:any;
  productsOfCategory:any;

  selectedFiles : any ;
  progress: any;
  currentFileUpload: any;
  public timeStamp : any; //current Time
  public editPhoto: any;

  public title?:string;
  searchString : any;

  totalProducts: any; // Nombre total de produits
  limitPerPage = 20; // Limite par page
  totalPageCount: number[] = []; // Tableau pour stocker les numéros de page
  lastPage:any;
  firstPage=1;

  currentPage = 1;
  KeyWord:any;
  searchMode :any;

  constructor(public catService:CatalogueService, public router:Router,
    private activeRoute :ActivatedRoute, private location:Location, private orderService:OrderService)
{

}
  
  ngOnInit(): void 
  { 


    this.activeRoute.params.subscribe((data)=>
    {           
        this.idCat = data['categoryId'];

           if(this.idCat)
           {
            this.getProducts("/products/productsByCat/"+this.idCat)
            this.getTotalProductsCount("/products/totalProductsCountByCat/"+this.idCat);
            
              this.catService.getRessource('/categories/'+this.idCat).subscribe({

                next: data => {
                                this.currentCategory=data;
                              /*
                                if(this.idCat == this.currentCategory.categoryId)
                                {
                                      this.productsOfCategory =this.currentCategory.products;
                                      this.getTotalProductsCount("/products/totalProductsCountByCat/"+this.idCat);
                                }
                                */
                              },
                error: err => console.error(err)
              });
              
              
            }

    })
    
  }

  private getProducts(url :any)
{
    this.catService.getRessource(url)
      .subscribe({
          next: data => {
                          this.productsOfCategory=data;
                        },
          error: err => console.error(err)
      });
}

  onBack()
  {
      this.location.back();
  }


  onEditPhoto(c :any)
  {
    this.currentCategory=c;
    this.editPhoto=true;
  }

  onSelectedFile(event : any)
  {
    this.selectedFiles=event.target.files;

  }

  uploadPhoto()
  {
    this.progress= "0 %";

    this.currentFileUpload = this.selectedFiles.item(0)

    this.catService.uploadPhotoCategory(this.currentFileUpload, this.currentCategory.categoryId)
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
                        this.editPhoto=false; // ajouté ???
                    }

                  },
      
      error:  err=>
                  {
                    alert("Problème de chargement !");
                     
                  }
                  
              });
    
            this.selectedFiles =undefined;
    
  }

  onCancelUploadPhoto()
  {
    this.editPhoto=false;
  }

  getTS()
  {

    return this.timeStamp;
  }

  onEditCategory(idCat:any)
{
  this.router.navigateByUrl("/category-edit/"+idCat);
} 

  onEditProduct(productId:any)
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
                                      this.getProducts("/products/productsByCat/"+this.idCat);
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

  //-------------------------------------------------------------------------------------------

searchForm = new FormGroup ({

  keyword: new FormControl('',[Validators.required])

});

onSearchProducts()
{
    this.KeyWord  = this.searchForm.get('keyword')?.value || '' ;

    this.title="Résultat de la recherche par :  " +this.KeyWord;

    this.getTotalProductsCount("/products/totalProductsCountByCategoryAndKeyword/"+this.idCat+"/"+this.KeyWord);

    let url = "/products/search/"+this.idCat+"/"+this.KeyWord;

    this.getProducts(url);

    this.searchMode = true;
    this.currentPage=1;
}

onAllProductsByCat()
{
  window.location.reload();
  //window.scrollTo({ top: 400, behavior: 'smooth' });
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
  if(this.searchMode == true)
  {
    this.getProducts('/products/search/'+this.idCat+"/"+this.KeyWord+'?page='+pageNumber);
  }
  else
  {
    this.getProducts('/products/productsByCat/'+this.idCat+'?page='+pageNumber);
  }  

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

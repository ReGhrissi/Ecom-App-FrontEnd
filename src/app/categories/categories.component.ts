import { Component, Input, OnInit, Output } from '@angular/core';
import { faTrash, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CatalogueService } from '../services/catalogue.service';
import { Router } from '@angular/router';
import { Category } from '../_Model/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit{

  myDelete=faTrash;
  myEdit=faUserPen;
  myNew=faUserPlus

  categories:any;
  totalProductsByCategory: { [key: string]: number } = {};

        constructor(public catService:CatalogueService, private router:Router)
        {
          
        }

  ngOnInit(): void {

    this.getCategories()
    
  }


  private getCategories()
  {
      this.catService.getRessource("/categories")
          .subscribe({
              next: data => {

                this.categories=data;

                this.categories.forEach((category:any) => {

                this.catService.getTotalProductsCountByCategory(category.categoryId)
                      .subscribe((count: any) => 
                      {
                          this.totalProductsByCategory[category.categoryId] = count;
                          
                      });
                });

              },
              error: err => {
                console.error(err)

                Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "Erreur : "+err.status,
                  text:"",
                  showConfirmButton: false,
                  timer: 2000
                });
              }
          });
  }

  onCategoryDetail(idCat :any)
  {
    this.router.navigateByUrl("/category-detail/"+idCat);
  }
  
  onEdit(idCat:any)
  {
    this.router.navigateByUrl("/category-edit/"+idCat);
  }

  newProduct(c :Category)
  {
  
    let url= c.categoryId;
    this.router.navigateByUrl("/new-product/"+url);
      
  }

  

  onDelete(categoryId:any)
  {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-green-600 text-white active:bg-black hover:bg-green-500 font-bold  text-lg w-32 px-4 py-3 mx-4  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150",
            cancelButton: "bg-rose-600 text-white active:bg-black hover:bg-rose-500 font-bold  text-lg w-32 px-4 py-3 mx-4  rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          },
          buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
          title: "Confirmation !",
          text: "Voulez-vous vraiment supprimer cette catégorie ?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Supprimer",
          cancelButtonText: "Annuler",
          reverseButtons: true
        }).then((result) => {

          if (result.isConfirmed) 
          {
            let categoryProductsCount; 

            this.catService.getTotalProductsCountByCategory(categoryId)
            .subscribe((count: any) => 
            {
                 categoryProductsCount = count;
                 console.log("couuuunt :"+categoryProductsCount)

                 if( categoryProductsCount != undefined &&  categoryProductsCount === 0)
                 {
                   
                   this.catService.deleteResource("/categories/"+categoryId).subscribe({
 
                     next: event=>
                                 {
                                   swalWithBootstrapButtons.fire({
                     
                                     title: "Supprimé !",
                                     text: "La catégorie a été supprimée avec succés.",
                                     icon: "success"
                                   });
                                   //window.location.reload();
                                   this.getCategories()
                                 },
                     error:  err=>
                                 {
                                   
                                   Swal.fire({
                                     position: "top-end",
                                     icon: "error",
                                     title: "Erreur dans la suppression de la catégorie : "+err.status,
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
                     text: "Vous ne pouvez pas supprimer une catégorie qui contienne des produits",
                     icon: "error"
                   });
 
                 }

                
            });

                
            
          } 
          else if (result.dismiss === Swal.DismissReason.cancel)
          {
              swalWithBootstrapButtons.fire({
                title: "Annullée !",
                text: "La suppression de la catégorie a été annullée.",
                icon: "error"
              });
          }
        });


        
  }
}

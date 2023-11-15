import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Icons } from '../_Plugins/icons.model';
import { Location} from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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

  idCat:any;
  currentCategory:any;
  productsOfCategory:any;

  selectedFiles : any ;
  progress: any;
  currentFileUpload: any;
  public timeStamp : any; //current Time
  public editPhoto: any;

  constructor(public catService:CatalogueService, public router:Router,
    private activeRoute :ActivatedRoute, private location:Location)
{

}
  
  ngOnInit(): void 
  { 


    this.activeRoute.params.subscribe((data)=>
    {           
        this.idCat = data['categoryId'];

           if(this.idCat)
           {
              this.catService.getRessource('/categories/'+this.idCat).subscribe({

                next: data => {
                                this.currentCategory=data;

                                if(this.idCat == this.currentCategory.categoryId)
                                {
                                      this.productsOfCategory =this.currentCategory.products;
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



}

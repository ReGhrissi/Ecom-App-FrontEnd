import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Icons } from '../_Plugins/icons.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-edit', 
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  icons : Icons = new Icons();
  myCancel=this.icons.myCancel;
  myNew=this.icons.myNew
  myEdit=this.icons.myEdit
  myId =this.icons.myKey
  myCat=this.icons.myCatManage
  myImage=this.icons.myImage
  myDesc=this.icons.myDesc
  myActive=this.icons.myAvailable

  idCat:any;
  currentCategory:any
  selectedFiles : any ;
  progress:any;
  currentFileUpload: any;
  public timeStamp : any;

  editCategoryForm:any;

  constructor(public catService:CatalogueService, public router:Router,
              private activeRoute :ActivatedRoute, private location:Location)
  {}

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
                                        this.editCategoryForm = new FormGroup ({

                                              name: new FormControl(this.currentCategory.name,[Validators.required]),
                                              description: new FormControl(this.currentCategory.description,[Validators.required]),
                                              active : new FormControl(this.currentCategory.active,[Validators.required]),                
                                        });
                                  }
                                  
                                },
                  error: err => 
                  {
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

    })
  }

  onBack()
  {
    this.location.back();
  }
  
  onUpdateCategory()
  {

    const name = this.editCategoryForm.get('name')?.value || '' ;
    const description = this.editCategoryForm.get('description')?.value || '' ;
    const active = this.editCategoryForm.get('active')?.value || '' ;



    this.catService.putResource("/categories/"+this.currentCategory.categoryId, { name, description, active }).pipe(

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
          
          this.currentCategory =data;

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "",
            text:"",
            showConfirmButton: false,
            timer: 2000
          });

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

        this.catService.uploadPhotoCategory(this.currentFileUpload, this.currentCategory.categoryId).subscribe({

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
                                    title: "",
                                    text:"",
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
                              title: "Erreur : "+err.status,
                              text:"",
                              showConfirmButton: false,
                              timer: 2000
                            });  
                          }                
        });
        
        this.selectedFiles =undefined;
    
  }


}



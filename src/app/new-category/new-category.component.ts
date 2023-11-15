import { Component } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { catchError } from 'rxjs';
import { Icons } from '../_Plugins/icons.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {


  icons :Icons = new Icons();
  
  myNew =this.icons.myNew;
  myCancel=this.icons.myCancel

  newCategory:any;

  constructor(public catService:CatalogueService, private router:Router, private location:Location)
  {
      
  }

  newCategoryForm = new FormGroup ({

    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required]),
    
  });

  onNewCategory()
  {
    const name = this.newCategoryForm.get('name')?.value || '' ;
    const description = this.newCategoryForm.get('description')?.value || '' ;

    this.catService.postRessource("/categories", { name, description}).pipe(

      catchError(err => {
                        console.log(err);
        throw err;
      })
      ).subscribe((data:any)=> {

          this.newCategory =data;
          this.router.navigate(['/category-edit/'+this.newCategory.categoryId]).then(() => {
            window.location.reload();
          });
          
        });
  }

  onBack() 
  {
    this.location.back();
  }
  /*
  onNewCategory(f:any)
  {
    this.catService.postRessource('/categories',f).pipe(

      catchError(err => {
        console.log(err);

        throw err;

      })
    ).subscribe((data:any)=> {

          console.log("dataaaaaaaa :"+data)

      this.newCategorie =data;
      this.router.navigateByUrl('/categories')
      console.log("newCategory :"+this.newCategorie)

            
            this.newCategorie.id = data['id'];
              console.log("ID commande apres submit :"+this.newCategorie.id)
    
             
           
 
    });
  }

*/
  
}

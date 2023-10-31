import { Component } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { catchError } from 'rxjs';
import { Icons } from '../_Plugins/icons.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent {


  icons :Icons = new Icons();
  
  myNew =this.icons.myNew;
  myCancel=this.icons.myCancel

  newCategorie:any;

  constructor(public catService:CatalogueService, private router:Router)
  {
      
  }


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


  
}

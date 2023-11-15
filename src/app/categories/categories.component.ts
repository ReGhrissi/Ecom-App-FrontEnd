import { Component, Input, OnInit, Output } from '@angular/core';
import { faTrash, faUserPen, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { CatalogueService } from '../services/catalogue.service';
import { Router } from '@angular/router';
import { Category } from '../_Model/category.model';

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
              next: data => {this.categories=data;console.log("all categories:"+data)},
              error: err => console.error(err)
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
}

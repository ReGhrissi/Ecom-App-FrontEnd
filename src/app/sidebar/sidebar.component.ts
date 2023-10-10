import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faAngleRight, faListCheck, faUsers} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { CatalogueService } from '../services/catalogue.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  myAngle = faAngleRight;
  myCatManage=faListCheck;
  myProdManage=faProductHunt;
  myUsersManage=faUsers
  
  @Input() _Categories : any;
  @Input() Current_Category : any;

  @Output() Products_By_Cat: EventEmitter<void> = new EventEmitter<void>();
  
  numberOfProducts:number=0;
  
  constructor(public catService:CatalogueService)
  {

  }

  ngOnInit(): void {
    
    // pour afficher le nombre des produits par categorie 
    this.getCount()
 
  }

  ProductsByCat(category :any)
  {
    this.Products_By_Cat.emit(category);
  }

  getCount()
  {
    
    this.catService.getNumberOfProductsForCategory(1)
    .subscribe((count: number) => {
      console.log(count)
        this.numberOfProducts = count;
});
  }
  

}

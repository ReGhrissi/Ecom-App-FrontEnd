import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faAngleRight, faListCheck, faUsers} from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Icons } from '../_Plugins/icons.model';
import { AuthentificationService } from '../services/authentification.service';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  icons : Icons = new Icons();

  myAngle= this.icons.myAngle;
  myCatManage= this.icons.myCatManage;
  myProdManage=this.icons.myProdManage;
  myUsersManage=this.icons.myUsersManage;
  myOrdersManager = this.icons.myOrdersManage;
  myComment=this.icons.myCommentSolid
  
  
  @Input() _Categories : any;
  @Input() Current_Category : any;

  @Output() Products_By_Cat: EventEmitter<void> = new EventEmitter<void>();
  
  numberOfProducts:number=0;

  currentUser :any= null;
  
  constructor(public catService:CatalogueService, public router:Router,
             public authService:AuthentificationService, private accountService:AccountService,
             private tokenService:TokenService)
  {

  }

  ngOnInit(): void { 
    
    // pour afficher le nombre des produits par categorie 
    this.getCount()
    
    this.accountService.isAuth.subscribe( res=> {
      if(res==true)
      {
        this.currentUser = this.tokenService.getInfos();
      }
      
    
    })
 
  }

  ProductsByCat(category :any)
  {
    this.Products_By_Cat.emit(category);
  }
/** 
  getAllProduct()
  {
    this.router.navigateByUrl('/products/0/0');
  }
*/
  getCount()
  {
    
    this.catService.getNumberOfProductsForCategory(1)
        .subscribe((count: number) => {
          console.log(count)
            this.numberOfProducts = count;
      });
  }
  
  onMyComments()
  {
    this.router.navigate(['/comments/'+this.currentUser.id]).then(() => {
      window.location.reload();
    });
  
  }

}

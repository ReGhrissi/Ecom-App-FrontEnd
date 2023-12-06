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
  myBack=this.icons.myBack
  
  
  @Input() _Categories : any;
  @Input() Total_Products_By_Category : { [key: string]: number } = {};
  @Input() Current_Category : any;

  @Output() Products_By_Cat: EventEmitter<void> = new EventEmitter<void>();
  
  currentUser :any= null;
  
  constructor(public catService:CatalogueService, public router:Router,
             public authService:AuthentificationService, private accountService:AccountService,
             private tokenService:TokenService)
  {

  }
 
  ngOnInit(): void { 

    
    this.accountService.isAuth.subscribe( res=> {
      if(res==true)
      {
        this.currentUser = this.tokenService.getInfos();
       // console.log("user :"+this.currentUser.id)
      }
      
    
    })
 
  }

  ProductsByCat(category :any)
  {
    this.Products_By_Cat.emit(category);
  }
  
  onMyComments()
  {
    if(this.currentUser)
    {
      this.router.navigate(['/comments/'+this.currentUser.id]).then(() => {
        window.location.reload();
      });
    }
  }
 
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';



import { AuthentificationService } from '../services/authentification.service';
import { PanierService } from '../services/panier.service';
import { Icons } from '../_Plugins/icons.model';
import { AccountService } from '../services/account.service';
import { TokenService } from '../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  icons :Icons = new Icons();

  myUser = this.icons.myUser;
  myAccount=this.icons.myAccount;
  myCartShopping = this.icons.myCartShopping;
  myLogin= this.icons.myLogin;
  myLogout = this.icons.myLogout;
  myPromo=this.icons.myPromo;
  myAvailable=this.icons.myAvailable;
  myNewPr=this.icons.myNewPr;
  myFutur=this.icons.myFutur;
  myTendancy=this.icons.myTendancy;
  myProdManage=this.icons.myProdManage;
  
  @Output() Selected_Products: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_Dispo: EventEmitter<void> = new EventEmitter<void>();

  @Output() all_Products: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_Promo: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_New: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_Tendancy: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_Futur: EventEmitter<void> = new EventEmitter<void>();
  @Output() Log_Out: EventEmitter<void> = new EventEmitter<void>();
  @Output() Log_In: EventEmitter<void> = new EventEmitter<void>();

  @Output() Jump_To_Section : EventEmitter<void> = new EventEmitter<void>();


  currentUser :any= null;

          constructor(
                      public authService:AuthentificationService,
                      public panierService: PanierService,
                      private accountService:AccountService,
                      private tokenService:TokenService,
                      private activeRoute:ActivatedRoute,
                      private router: Router,
                      public userService:UserService
                    )
          {
            
          } 

  ngOnInit(): void {

    this.accountService.isAuth.subscribe( res=> {
        if(res==true)
        {
          this.currentUser = this.tokenService.getInfos();
        }
        
      
    })

    this.activeRoute.fragment.subscribe((data) =>{

      this.jumpToSection(data);
    })
  } 


  SelectedProducts() 
  {
      this.Selected_Products.emit();
  }

  ProductsDispo()
  {
      this.products_Dispo.emit();
  }

  AllProducts()
  {
      this.all_Products.emit();
  }

  ProductsPromo()
  {
      this.products_Promo.emit();
  }

  ProductsNew()
  {
      this.products_New.emit();
  }

  ProductsTendancy()
  {
      this.products_Tendancy.emit();
  }

  ProductsFutur()
  {
      this.products_Futur.emit();
  }


  Logout()
  {
      this.Log_Out.emit();
  }

  Login()
  {
      this.Log_In.emit();
  }

  jumpToSection(section : any)
  {
      this.Jump_To_Section.emit(section)
  }

  onMyAccount()
  {
    this.router.navigate(['/account/'+this.currentUser.id]).then(() => {
      window.location.reload();
    });
  }

}

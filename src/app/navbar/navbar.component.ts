import { Component, EventEmitter, Output } from '@angular/core';
import { Collapse } from "flowbite";
import type { CollapseOptions, CollapseInterface } from "flowbite";
import {faUser} from '@fortawesome/free-regular-svg-icons';
import { faCartShopping, faCircleUser, faRightToBracket, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {} from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/free-brands-svg-icons';


import { AuthentificationService } from '../services/authentification.service';
import { PanierService } from '../services/panier.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  myUser = faCircleUser;
  myCartShopping = faCartShopping;
  myLogin= faRightToBracket;
  myLogout = faRightFromBracket;
  
  @Output() Selected_Products: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_Promo: EventEmitter<void> = new EventEmitter<void>();
  @Output() products_Dispo: EventEmitter<void> = new EventEmitter<void>();
  @Output() Log_Out: EventEmitter<void> = new EventEmitter<void>();
  @Output() Log_In: EventEmitter<void> = new EventEmitter<void>();


          constructor(
                      public authService:AuthentificationService,
                      public panierService: PanierService
                    )
          {
            
          }


  SelectedProducts() 
  {
      this.Selected_Products.emit();
  }

  ProductsPromo()
  {
      this.products_Promo.emit();
  }

  ProductsDispo()
  {
      this.products_Dispo.emit();
  }

  Logout()
  {
      this.Log_Out.emit();
  }

  Login()
  {
      this.Log_In.emit();
  }

}

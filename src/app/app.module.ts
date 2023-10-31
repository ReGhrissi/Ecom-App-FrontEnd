import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faStackOverflow,
  faGithub,
  faMedium,
} from '@fortawesome/free-brands-svg-icons';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
//import { MatIconModule } from '@angular/material/icon';
//import { MatInputModule } from '@angular/material/input';
//import { MatButtonModule } from '@angular/material/button';
//import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CaddyComponent } from './caddy/caddy.component';
import { ClientComponent } from './client/client.component';
import { PaymentComponent } from './payment/payment.component';
import { CatalogueService } from './services/catalogue.service';
import { OrderComponent } from './order/order.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { RegisterComponent } from './register/register.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriesComponent } from './categories/categories.component';
import { UsersComponent } from './users/users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { HomeComponent } from './home/home.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ButtonComponent } from './_Plugins/button/button.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountComponent } from './account/account.component';
import { DeletePopUpComponent } from './_Plugins/delete-pop-up/delete-pop-up.component';
import { OrdersComponent } from './orders/orders.component';
import { AboutComponent } from './about/about.component';
import { HistoryOrdersComponent } from './history-orders/history-orders.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { CarouselModule } from 'ngx-owl-carousel-o';


//import { FlowbiteModule } from 'flowbite';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LoginComponent,
    ProductDetailComponent,
    CaddyComponent,
    ClientComponent,
    PaymentComponent,
    OrderComponent,
    ConfirmComponent,
    RegisterComponent,
    NewProductComponent,
    NewCategoryComponent,
    FooterComponent,
    CategoriesComponent,
    UsersComponent,
    SidebarComponent,
    NavbarComponent,
    UserOrdersComponent,
    HomeComponent,
    ProductEditComponent,
    ButtonComponent,
    PageNotFoundComponent,
    AccountComponent,
    DeletePopUpComponent,
    OrdersComponent,
    AboutComponent,
    HistoryOrdersComponent,
    PasswordResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  //  MatIconModule,
   // MatInputModule,
   // MatButtonModule,
   // MatButtonToggleModule,
    FontAwesomeModule,
    CommonModule,
    CarouselModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [
    //CatalogueService,
    CaddyComponent,
   // {
   //   provide: HTTP_INTERCEPTORS,
   ////   useClass: JwtInterceptor,
    //  multi: true
   // }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
/*
  constructor(library: FaIconLibrary) 
  {
    library.addIcons(
      faSquare,
      faCheckSquare,
      farSquare,
      farCheckSquare,
      faStackOverflow,
      faGithub,
      faMedium
    );
    }
*/
}

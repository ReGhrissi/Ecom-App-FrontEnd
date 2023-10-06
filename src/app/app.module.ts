import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule
  ],
  providers: [
    //CatalogueService,
    CaddyComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

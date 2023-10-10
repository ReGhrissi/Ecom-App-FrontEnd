import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CaddyComponent } from './caddy/caddy.component';
import { ClientComponent } from './client/client.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { CategoriesComponent } from './categories/categories.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { NewProductComponent } from './new-product/new-product.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',redirectTo:'products/1/0',pathMatch:'full'},
  {path:'users', component:UsersComponent},
  {path:'categories', component:CategoriesComponent},
  {path:'new-category', component:NewCategoryComponent},  
  {path:'products', component:ProductsComponent},
  {path:'new-product', component:NewProductComponent},
  {path:'products/:p1/:p2',component:ProductsComponent},
  {path:'login',component:LoginComponent},
  {path:'product-detail/:url',component:ProductDetailComponent}, //on a utiliser un URL au lieu de ID
  {path:'caddy', component:CaddyComponent},
  {path:'client', component:ClientComponent},
  {path:'order', component:OrderComponent},
  {path:'payment/:orderID', component:PaymentComponent},
  {path:'confirm', component:ConfirmComponent},
  {path:'user-orders', component:UserOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

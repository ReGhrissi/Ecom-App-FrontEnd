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
import { ProductEditComponent } from './product-edit/product-edit.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrdersComponent } from './orders/orders.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard} from './guards/auth.guard';
import { AfterAuthGuard } from './guards/after-auth.guard';
import { AboutComponent } from './about/about.component';
import { HistoryOrdersComponent } from './history-orders/history-orders.component';
import { HomeComponent } from './home/home.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AdminGuard } from './guards/admin.guard';
import { CommentsComponent } from './comments/comments.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'users', component:UsersComponent, canActivate: [AuthGuard] },
  {path:'new-user/Administrator', component:NewUserComponent, canActivate: [AuthGuard] },
  {path:'user-edit/:userId', component:UserEditComponent, canActivate: [AuthGuard] },
  {path:'categories', component:CategoriesComponent, canActivate: [AuthGuard, AdminGuard] },
  {path:'new-category', component:NewCategoryComponent, canActivate: [AuthGuard, AdminGuard] }, 
  {path:'category-edit/:categoryId', component:CategoryEditComponent, canActivate: [AuthGuard]} , 
  {path:'category-detail/:categoryId', component:CategoryDetailComponent, canActivate: [AuthGuard]} , 
  {path:'product-edit', component:ProductEditComponent, canActivate: [AuthGuard]} , 
  {path:'product-edit/:productId', component:ProductEditComponent, canActivate: [AuthGuard]} ,
  {path:'new-product', component:NewProductComponent, canActivate: [AuthGuard] },
  {path:'new-product/:categoryId', component:NewProductComponent, canActivate: [AuthGuard] },
  {path:'products/:p1/:p2',component:ProductsComponent},
 // {path:'products/all',component:ProductsComponent},
  {path:'login',component:LoginComponent, canActivate: [AfterAuthGuard] },
  {path:'password-reset',component:PasswordResetComponent },
  {path:'register',component:RegisterComponent, canActivate: [AfterAuthGuard] },
  {path:'product-detail/:productId',component:ProductDetailComponent}, //on a utiliser un URL au lieu de ID
  {path:'caddy', component:CaddyComponent},
  {path:'client', component:ClientComponent, canActivate: [AuthGuard] },
  {path:'order', component:OrderComponent, canActivate: [AuthGuard] },
  {path:'payment/:orderID', component:PaymentComponent, canActivate: [AuthGuard] },
  {path:'confirm', component:ConfirmComponent, canActivate: [AuthGuard] },
  {path:'user-orders', component:UserOrdersComponent, canActivate: [AuthGuard] },
  {path:'orders/:orderStatus', component:OrdersComponent, canActivate: [AuthGuard] },
  {path:'account/:idUser', component:AccountComponent, canActivate: [AuthGuard] },
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'history-orders', component:HistoryOrdersComponent},
  {path:'comments/:idUser', component:CommentsComponent, canActivate: [AuthGuard]},

  {path:'**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

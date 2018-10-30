import { CategoriesService } from './categories.service';
import { AdminAuthService } from "./admin-auth-service.service";
import { AuthGuardService } from "./auth-guard.service";
import { AuthService } from "./auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { NgbCollapseModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";
import { ShoppingCartComponent } from "./shopping-cart/shopping-cart.component";
import { CheckOutComponent } from "./check-out/check-out.component";
import { OrderSuccessComponent } from "./order-success/order-success.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { AdminProductsComponent } from "./admin/admin-products/admin-products.component";
import { AdminOrdersComponent } from "./admin/admin-orders/admin-orders.component";
import { LoginComponent } from "./login/login.component";
import { BsNavbarComponent } from "./bs-navbar/bs-navbar.component";
import { UserService } from "./user.service";
import { ProductFormComponent } from './admin/product-form/product-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    BsNavbarComponent,
    ProductFormComponent
  ],
  imports: [
    NgbCollapseModule,
    NgbModule.forRoot(),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "products", component: ProductsComponent },
      { path: "shopping-cart", component: ShoppingCartComponent },
      { path: "login", component: LoginComponent },
      {
        path: "check-out",
        component: CheckOutComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "my/orders",
        component: MyOrdersComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "order-success",
        component: OrderSuccessComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: "admin/products",
        component: AdminProductsComponent,
        canActivate: [AuthGuardService, AdminAuthService]
      },
      {
        path: "admin/orders",
        component: AdminOrdersComponent,
        canActivate: [AuthGuardService, AdminAuthService]
      },
      {
        path: "admin/products/new",
        component: ProductFormComponent,
        canActivate: [AuthGuardService, AdminAuthService]
      }
    ])
  ],
  providers: [AuthService, AuthGuardService, UserService, AdminAuthService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule {}

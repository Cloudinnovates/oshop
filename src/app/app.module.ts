import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*FireBase*/
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

/*Application  Components */
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { LoginComponent } from './login/login.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';

/*Application Admin Components*/
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

/** Services */
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';

/* Router */
import { RouterModule } from '@angular/router';

/* Ng bootstrap module for dropdown click on nav bar */
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/* For Bootstrap forms */
import { FormsModule } from '@angular/forms';

/* Custom Validation for Form Fields */
import { CustomFormsModule} from 'ng2-validation';

/* Data Table Module */
import { DataTableModule } from 'angular-4-data-table';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    RouterModule.forRoot([
     { path: '' , component: ProductsComponent   },
     { path: 'products' , component: ProductsComponent   },
     { path: 'shopping-cart' , component: ShoppingCartComponent   },
      { path: 'login' , component: LoginComponent   },
     { path: 'my/orders' , component: MyOrdersComponent , canActivate: [AuthGuardService]  },
     { path: 'check-out' , component: CheckOutComponent , canActivate: [AuthGuardService]  },
     { path: 'order-success' , component: OrderSuccessComponent , canActivate: [AuthGuardService]  },
     { path: 'admin/products/new' , component: ProductFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService] },
     { path: 'admin/products/:id' , component: ProductFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService] },
     { path: 'admin/products' , component: AdminProductsComponent ,   canActivate: [AuthGuardService, AdminAuthGuardService]  },
     { path: 'admin/orders' , component: AdminOrdersComponent , canActivate: [AuthGuardService, AdminAuthGuardService]   }

    ])

  ],
  providers: [
    AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

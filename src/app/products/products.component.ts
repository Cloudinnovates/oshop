import {Product} from '../models/product';
import {ProductService} from '../product.service';
import { ShoppingCartService } from '../shopping-cart.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  // initialize arrays.
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoppingCartService ) {
    
    productService.getAll()
      .switchMap(products => {
      this.products = products;
      return route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        // if category exists return filtered products else return
        // all products.
        this.filteredProducts = (this.category) ?
        this.products.filter(p => p.category === this.category) :
        this.products;
      });

  } // constructor end.
  
 async ngOnInit(){
      this.subscription= (await this.shoppingCartService.getCart())
        .subscribe(cart => this.cart = cart);
  }
  
  ngOnDestroy() {
     this.subscription.unsubscribe();
  }

}

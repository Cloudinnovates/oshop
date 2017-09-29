import {Product} from '../models/product';
import {ShoppingCart} from '../models/shopping-cart';
import {ProductService} from '../product.service';
import {ShoppingCartService} from '../shopping-cart.service';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription, Observable} from 'rxjs';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // initialize arrays.
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;

  /**
   * Constructor
   */
  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) {}

  /**
   * Initialization Code.
   */
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  
  }
  
  /**
   * Populate Products
   * from database
   */
  private populateProducts(){
      this.productService.getAll()
      .switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  /**
   * Filter products
   */
  private applyFilter() {
    // if category exists return filtered products else return
    //  all products.
        
      this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) :
      this.products;


  }

}

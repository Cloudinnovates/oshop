import { ProductService } from '../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: {title: string}[];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
      // this.products$ = this.productService.getAll();
       this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
       this.subscription.unsubscribe();
  }

  /*
   * Filter products by query string.
   */
  filter(query: string) {
        // if query has value return filtered products
        // else return all products.
        this.filteredProducts = (query) ?
        this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
        this.products;

  }

}

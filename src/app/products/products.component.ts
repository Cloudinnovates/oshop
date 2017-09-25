import {CategoryService} from '../category.service';
import {Product} from '../models/product';
import {ProductService} from '../product.service';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  // initialize arrays.
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories$;
  category: string;

  constructor(route: ActivatedRoute,
    productService: ProductService,
    categoryService: CategoryService) {

    productService
      .getAll()
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

    /*
    productService.getAll().subscribe(products => {
      this.products = products;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');

        // if category exists return filtered products else return
        // all products.
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
    });*/

    this.categories$ = categoryService.getAll();

  }


}

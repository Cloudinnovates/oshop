import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$; // observable
  // set product to an empty object so when we add a new product
  // the form doesn't break with 2 way bindings.
  product= {};
  id;

  constructor(
    private router: Router, // used to navigate to another page.
    private route: ActivatedRoute, // used to read route parameters.
    private categoryService: CategoryService,
    private productService: ProductService) {
       this.categories$ = categoryService.getAll();


       this.id =  this.route.snapshot.paramMap.get('id');
       if (this.id) {
               // with take  we take just one item and observable is complete and we dont
               // need any new values in the future so we dont need to unsubscribe.
               this.productService.get(this.id).take(1).subscribe(p => this.product = p);
       }

  }

  ngOnInit() {
  }

  /**
   * Save or update a product
   * into the database.
   */
  save(product) {

    if (this.id) {
           this.productService.update(this.id, product);
    }
    else { this.productService.create(product); }

     // take the user back to the list of products.
     this.router.navigate(['/admin/products']);
  }

  /**
   * Delete a product from
   * the database.
   */
  delete() {
     if (confirm('Are you sure you want to delete this product?')) {
             this.productService.delete(this.id);
             this.router.navigate(['/admin/products']);
     }

  }


}

import { Product } from '../../models/product';
import { ProductService } from '../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  // products on current page.
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {

       this.subscription = this.productService.getAll()
         .subscribe(products => {
          this.products = products;
          this.initializeTable(products);
       });
  }

  /**
   * Initalize Data Table Resource.
   */
  private initializeTable(products: Product[]){
      this.tableResource = new DataTableResource(products);
      this.tableResource.query({offset: 0}).then(items => this.items = items);
      this.tableResource.count().then(count => this.itemCount = count );
  }

  /**
   * Reload data table items
   */
  reloadItems(params){
    // reloadItems is called everytime the page loads.
   if (!this.tableResource){
       return;
   }
   this.tableResource.query(params).then(items => this.items = items);
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
      let  filteredProducts = (query) ?
        this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
        this.products;

    // after we filter products we need to pass them to our
    // data table resource object
    this.initializeTable(filteredProducts);

  }

}

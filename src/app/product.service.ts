import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) {
   }

  /*
   * Create a new product in db.
   */
  create(product) {
     return this.db.list('/products').push(product);
   }

  /**
   * Retrieve all products from the db
   */
  getAll() {
       return this.db.list('/products');
  }

  /**
   * Retrieve product details based
   * on ID.
   */
    get(productId) {

        return this.db.object('/products/' + productId );

    }

  /*
   * Update an existing product
   */
  update(productId, product) {
     return this.db.object('/products/' + productId).update(product);

  }

  /**
   * Delete a product from the database.
   */
  delete(productId) {
      return this.db.object('/products/' + productId).remove();
  }

}

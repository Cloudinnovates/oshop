import { Product } from './models/product';
import { ShoppingCart } from './models/shopping-cart';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable  } from 'angularfire2/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  /**
   * Creates a new shopping cart
   */
  private create(){
     return this.db.list('/shopping-carts').push({
       dateCreated: new Date().getTime()
     });
  }
  
  /**
   * Retrieves cart from db
   * async since calls 1 or more
   * async methods.
   */
  async getCart(): Promise<Observable<ShoppingCart>> {
     let cartId = await this.getOrCreateCartId();
     return this.db.object('/shopping-carts/' + cartId)
       .map(x => new ShoppingCart(x.items));
      
  }
  
  /**
   * Retrieve Item for 
   * Cart..
   */
  private getItem(cartId: string, productId: string){
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  
  /**
   * async method since 
   * it has 1 or more async calls.
   */
  private async getOrCreateCartId(): Promise<string>{
      let cartId=localStorage.getItem('cartId');
      if(cartId) return cartId;
    
      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    
  }
  
  /*
   * Add product to shopping cart.
   * async since has 1 or more async calls.
   */
  async addToCart(product : Product) {
    this.updateItemQuantity(product, 1);
  }
  
  /**
   * Remove product from cart.
   * async since has 1 or more async calls.
   */
  async removeFromCart(product: Product){
      this.updateItemQuantity(product, -1);
  }
  
  /**
   * Update item quantity for product in 
   * shopping cart.
   *  async since has 1 or more async calls.
   */
  private async updateItemQuantity(product: Product, change: number){
     let cartId = await this.getOrCreateCartId();
     let item$ = this.getItem(cartId, product.$key);
     
     // with take you don't need to unsubscribe.
     item$.take(1).subscribe(item =>{
       item$.update({ product: product, quantity: (item.quantity || 0 ) + change });
     });
    
  }
 
    

}

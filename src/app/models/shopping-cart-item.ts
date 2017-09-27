import { Product } from './product';

export class ShoppingCartItem{
  title: string;
  imageUrl: string;
  $key: string;
  price: number;
  quantity: number;
  
  /**
   * Constructor
   * init is optional
   * init can be an object that looks like a 
   * shopping cart item object
   */
  constructor(init?: Partial<ShoppingCartItem>) {
        // copy from target to source.
        Object.assign(this, init);
  }
  
  
  get totalPrice() {
      return this.price * this.quantity ;
  }
  
}
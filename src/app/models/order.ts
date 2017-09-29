/**
 * Encapsulates
 * a shipping order placed by user.
 */
import { ShoppingCart } from './shopping-cart';
export class Order{
  datePlaced: number;
  items: any[];
  
  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart){
    this.datePlaced = new Date().getTime();
    
    //map shopping cart items to order items array.
    this.items = shoppingCart.items.map(i => {
           return{
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
             quantity: i.quantity,
             totalPrice: i.totalPrice
           }
      })
    
  }
  
  
}
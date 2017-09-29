import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;
 
  /**
   * Constructor
   */
  constructor(
    private shoppingCartService: ShoppingCartService){ }
  
  /**
   * Initialization Code
   * when component is initalized
   */
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
   
  }//end ngOnInit
  
   
  
}

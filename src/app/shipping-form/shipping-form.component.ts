import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { OrderService } from '../order.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
   @Input('cart') cart:ShoppingCart;
   shipping = {}; 
   userId: string;
   userSubscription: Subscription;
  
 /**
   * Constructor
   */
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
    ){ }

  ngOnInit() {
     this.userSubscription = this.authService.user$.subscribe(user=> this.userId =user.uid);
  }
  
  
  /**
   * OnDestroy method when 
   * component is destroyed.
   */
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
  
  
  /**
   * Place a shipping order.
   * TODO: Need to use transactions here since it
   * involves updating multiple nodes.
   */
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
    
  }//end of placeOrder

}

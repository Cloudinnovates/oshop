import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
 
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;

   // afAuth.authState is an observable that represents
   // the authenticate state of the user.
  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) {
  }

  logout() {
      this.auth.logout();
  }
  
  async ngOnInit() {
         // Dont need to unsubscribe here since we have a single
         // instance of navbar component in DOM which lives
         // throughout the application.
         this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
         
         this.cart$ = await this.shoppingCartService.getCart();
   }

}

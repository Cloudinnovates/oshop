import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate {

  // with RouterStateSnapshot we can get the URL that the user tried to
  // access when authguard service kicked in.
  canActivate(route, state: RouterStateSnapshot) {
    // get authentication status of current user.
    // if user is logged in return true else return false and navigate to login page.

    // mapping an observable of firebase user to observable boolean.
    return this.auth.user$.map(user => {
         if (user) { return true; }

         this.router.navigate(['/login'] , {queryParams : {returnUrl: state.url}} );
         return false;

    });

  }

  constructor( private auth: AuthService, private router: Router) {
  }

}

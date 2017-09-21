import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  {
    appUser: AppUser;

   // afAuth.authState is an observable that represents
   // the authenticate state of the user.
  constructor(private auth: AuthService) {
         // Dont need to unsubscribe here since we have a single
         // instance of navbar component in DOM which lives
         // throughout the application.
         auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
      this.auth.logout();
  }

}

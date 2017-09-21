import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Single Instance of this Root Component for application in DOM.
// So we dont need to unsubscribe
export class AppComponent {

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
      auth.user$.subscribe(user => {

        // Redirecting after logging IN to where user came from or
        // home page.
          if ( user) {

            // when user logs in store them in the database.
            // TODO :Future add Registration form and save the user as part of the
            // registration process.
            // With OAuth providers users can update name or email address outside of
            // the application.So we ensure this way our database is upto date.
            userService.save(user);

            // every time user logs in or logs out
            let returnUrl = localStorage.getItem('returnUrl');
            router.navigateByUrl(returnUrl);
        }

      });
  }
}

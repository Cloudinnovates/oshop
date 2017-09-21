import { AppUser } from './models/app-user';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

// For google authentication.
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService,
              private afAuth: AngularFireAuth,
              private route: ActivatedRoute) {
    // Always unsubscribe from firebase observables.
    // Async pipe will automatically unsubscribe from observable
    // when the component is destroyed.
    this.user$ = afAuth.authState;
  }


  login() {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    // signInWithRedirect is used to implement OAuth with one of
    // the OAuth providers -- Google in this case.
    // TODO : Refactor this into a separate service.
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

    // when they come back from authentication we need to read the local
    // storage and extract returnUrl and navigate the user accordingly.

  }

  logout() {
     this.afAuth.auth.signOut();

  }


  get appUser$(): Observable<AppUser>{
     return this.user$
          .switchMap(user => {
             if (user) {
               return this.userService.read(user.uid);
             }

            // return an Observable that emits a null value.
            return Observable.of(null);

          });
  }


}

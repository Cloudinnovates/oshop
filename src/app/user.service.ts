import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from './models/app-user';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  /*
   * Save user into the db.
   */
  save(user: firebase.User) {
      this.db.object('/users/' + user.uid).update({
          name: user.displayName,
          email: user.email

      });

  }

  /*
   * Read user from Database.
   * Annotated method to return FirebaseObjectObservable<AppUser>
   */
  read(uid: string): FirebaseObjectObservable<AppUser> {
     return this.db.object('/users/' + uid);
  }

}

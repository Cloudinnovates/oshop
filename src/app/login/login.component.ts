import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  constructor(public auth: AuthService) { }

  // AngularFire is an abstraction over the firebase lib.
  // AngularFire has limited support for authentication
  // so work directly with the Firebase library.
  login() {

       this.auth.login();

  }

}

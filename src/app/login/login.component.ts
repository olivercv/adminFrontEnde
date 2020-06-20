import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';




declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  rememberme: boolean ;
  constructor(
              private router: Router,
              public userService: UserService
              ) { }

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1 ) {
      this.rememberme = true;
    }
  }

  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    let user = new User( null, null, forma.value.email, forma.value.password );

    this.userService.login( user, forma.value.rememberme )
              .subscribe ( resp => this.router.navigate(['/dashboard']));
  }
 
}

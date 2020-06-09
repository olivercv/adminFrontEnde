import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
    init_plugins();
  }

  ingresar() {
    // console.log('Ingresando...');
    this.router.navigate(['/dashboard']);
  }
  
}

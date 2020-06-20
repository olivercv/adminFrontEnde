import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { group } from '@angular/animations';
import { ReturnStatement } from '@angular/compiler';

// import * as swal from 'sweetalert';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';


declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent implements OnInit {

  registration: FormGroup;
  constructor(
    public router: Router,
    public userService: UserService

    ) { }





  ngOnInit(): void {
    init_plugins();

    this.registration = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      password2: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15), this.equalto('password')]),
      conditions: new FormControl(false)
    });

    // this.registration.setValue({
    //   name: 'Test 1',
    //   email: 'test@test.com',
    //   password: '123456',
    //   password2: '123456',
    //   conditions: true
    // });

  }

  equalto(field_name): ValidatorFn  {
    return (control: AbstractControl): { [key: string]: any } => {
        const input = control.value;
        const isValid = control.root.value[field_name] == input;
        if (!isValid) {
            return {'equalTo': {isValid}};
        }
        else {
            return null;
        }
    };
  }

  registerUser() {

    if (this.registration.invalid) {
      return;
    }

    if ( !this.registration.value.conditions) {
      console.log('Debe aceptar las condiciones');
      // swal("Importante", "Debe aceptar las condiciones", "warning");
      return;
    }
    console.log('pass', this.registration.value.password);

    const user = new User (null,
      this.registration.value.name,
      this.registration.value.email,
      this.registration.value.password
    );

    this.userService.saveUser( user )
            .subscribe( resp => {
              console.log( resp );
              this.router.navigate(['/login']);
            });
  }


}

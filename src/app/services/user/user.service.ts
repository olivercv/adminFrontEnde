import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../global.service';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter, switchAll } from 'rxjs/operators';
// import * as swal from 'sweetalert';
import Swal from 'sweetalert2';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
import { UploadFileService } from '../upload-file/upload-file.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public http: HttpClient, public router: Router, public uploadFileService: UploadFileService) {
                this.getStorage();

            }

  isLogged() {
    return (this.token.length > 5 ) ? true : false;
  }

  getStorage() {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  login( user: User, rememberme: boolean = false ) {

    if (rememberme) {
      localStorage.setItem( 'email', user.email );
    } else {
      localStorage.removeItem('email');
    }

    const url = GLOBAL.urlServices + '/login';

    return this.http.post( url, user ).pipe(map( (resp: any) => {

                  this.saveStorage( resp.id, resp.token, resp.user);
                  return true;
                 }));

  }

  saveStorage( id: string, token: string, user: User ) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token );
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;

  }



  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);


  }

  saveUser( user: User) {

    const url = GLOBAL.urlServices + '/user';
    return this.http.post( url, user ).pipe(
              map( (resp: any) => {
                Swal.fire({
                  position: 'top',
                  icon: 'success',
                  title: 'El usuario fue creado correctamente',
                  showConfirmButton: false,
                  timer: 1500
                });


                // console.log(resp.user);
                return resp.user;
              }));

  }

  updateUser( user: User ) {
    let url = GLOBAL.urlServices + '/user/' + user._id;
    url += '?token=' + this.token;

    // console.log( url );

    return this.http.put( url, user ).pipe(
        map( (resp: any)  => {
          if ( user._id === this.user._id) {
            const userDB: User = resp.user;
            // this.user = resp.user;
            this.saveStorage(resp.user._id, this.token, userDB);
          }
          // Swal('Usuario actualizado', user.name, 'success');
          alert('Usuario actualizado');
          return true;
        }));

  }

  changeImage( file: File, id: string ) {
    this.uploadFileService.uploadFile( file, 'users', id)
    .then ( (resp: any) => {
      // console.log(resp);
      this.user.image = resp.user.image;
      this.saveStorage( id, this.token, this.user );

    })
    .catch( (resp: any) => {
      console.log(resp);
    });
  }

  getUsers( to: number = 0 ) {
    const url = GLOBAL.urlServices + '/user?to=' + to;
    return this.http.get( url );
  }

  searchUsers( term: string) {
    // console.log('busqueda', term);
    const url = GLOBAL.urlServices + '/search/for/users/' + term;
    return this.http.get( url ).pipe(
            map( ( resp: any ) => resp.users )
    );
  }

  deleteUser( id: string ) {
    let url = GLOBAL.urlServices + '/user/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url ).pipe(
      map( resp => {
        alert('Usuario eliminado correctamente');
        return true;
      })
    );
  }

}

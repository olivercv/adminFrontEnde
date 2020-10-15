import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GLOBAL } from '../global.service';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Publication } from '../../models/publication.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  limit = 8;
  page = 1;
  pages = 0;
  total = 0;
  public token;
  user: User;
  public url: string;

  constructor( public http: HttpClient, public router: Router, public userService: UserService ) {
    this.url = GLOBAL.urlServices;
   }

   pagination( page: number) {

    console.log('pagina recibida', page );
    console.log('total', this.pages );
    if (page > this.pages) { return; }
    if (page <= 0) { return; }
    this.page =  page;
  }

  getPublications( page: number = 1 , limit: number = 5 ) {
    let uri = this.url + '/publication?page=' + page ;
    if( limit !== 5) {
      uri = uri + '&limit=' + limit;
    }
    console.log('url enviada', uri);
    return this.http.get( uri ).pipe(
      map( ( resp: any ) => {
          this.pages = resp.pages;
          this.total = resp.total;
          return resp.publications;
      })
    );
  }

  getPublication( id: string ) {
    const uri = this.url + '/publication/' + id;
    return this.http.get( uri ).pipe(
          map( (resp: any) => resp.publication )
    );
  }

  deletePublication( id: string) {

    let uri = this.url + '/publication/' + id;
    uri += '?token=' + this.userService.token;
    return this.http.delete( uri ).pipe(
      map( resp => {
        alert('Publicación Borrada');
        return resp;
      })
    );
  }

  updatePublication(publication: Publication) {
    let uri = this.url + '/publication/' + publication._id;
    uri += '?token=' + this.userService.token;

    return this.http.put( uri, publication ).pipe(
        map( (resp: any) => resp.publication )
    );
  }

  savePublication( publication: Publication ) {

    let uri = this.url + '/publication';

    if ( publication._id ) {
      uri += '/' + publication._id;
      uri += '?token=' + this.userService.token;

      return this.http.put( uri, publication ).pipe(
              map( ( resp: any ) => {
                alert('La publicación se actualizó correctamente' + publication.title);
                return resp.publication;

              })
      );

    } else {
      // crea la notificación
      uri += '?token=' + this.userService.token;
      return this.http.post( uri, publication).pipe(
          map( (resp: any) => {
            alert('Se ha creado una publicación');
            return resp.publication;
          })
      );

    }

  }

  searchPublications( term: string) {
    // console.log('busqueda', term);
    const uri = this.url + '/search/for/publications/' + term;
    return this.http.get( uri ).pipe(
            map( ( resp: any ) => resp.publications )
    );
  }

}

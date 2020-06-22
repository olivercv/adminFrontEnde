import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../global.service';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { UserService } from '../service.index';
import { Category } from '../../models/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  total = 0;

  public token;
  user: User;
  public url: string;

  constructor( public http: HttpClient,  public userService: UserService ) {
    this.url = GLOBAL.urlServices;
   }

   getCategories( to: number = 0 ) {
    const uri = this.url + '/category?to=' + to;
    return this.http.get( uri ).pipe(
      map( ( resp: any ) => {
          this.total = resp.total;
          return resp.categories;
      })
    );
  }

  getCategory( id: string ) {
    const uri = this.url + '/category/' + id;
    return this.http.get( uri ).pipe(
          map( (resp: any) => resp.category )
    );
  }



  deleteCategory( id: string) {

    let uri = this.url + '/category/' + id;
    uri += '?token=' + this.userService.token;
    return this.http.delete( uri ).pipe(
      map( resp => {
        alert('Categoría Borrada');
        return resp;
      })
    );
  }

  updateCategory(category: Category) {
    let uri = this.url + '/category/' + category._id;
    uri += '?token=' + this.userService.token;

    return this.http.put( uri, category ).pipe(
        map( (resp: any) => resp.category )
    );
  }

  saveCategory( category: Category ) {
    let uri = this.url + '/category';

    if ( category._id ) {
      uri += '/' + category._id;
      uri += '?token=' + this.userService.token;

      return this.http.put( uri, category ).pipe(
              map( ( resp: any ) => {
                alert('La categoría se actualizó correctamente' + category.name);
                return resp.category;

              })
      );

    } else {
      // crea la categoría
      uri += '?token=' + this.userService.token;
      return this.http.post( uri, category).pipe(
          map( (resp: any) => {
            alert('Se ha creado una categoría');
            return resp.category;
          })
      );

    }

  }

  searchCategories( term: string) {
    // console.log('busqueda', term);
    const uri = this.url + '/search/for/categories/' + term;
    return this.http.get( uri ).pipe(
            map( ( resp: any ) => resp.categories )
    );
  }
}

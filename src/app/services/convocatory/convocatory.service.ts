import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GLOBAL } from '../global.service';
import { map } from 'rxjs/operators';
import { Convocatory } from '../../models/convocatory.model';
import { Doc } from '../../models/doc.model';
import { SnackService } from '../snack.service';


@Injectable({
  providedIn: 'root'
})
export class ConvocatoryService {

  total: number=0;
  public url: string;
  constructor(
  public http: HttpClient,
  public router: Router,
  private snackService: SnackService,
  ) {
    this.url = GLOBAL.urlServices;
  }


  getConvocatories( to: number = 0 ) {
    const uri = this.url + '/convocatory?to=' + to;
    return this.http.get( uri ).pipe(
      map( ( resp: any ) => {
          this.total = resp.total;
          return resp.convocatories;
      })
    );
  }

  cargarDocs() {

    const uri = this.url + '/doc';
    return this.http.get( uri ).pipe(
              map( (resp: any) => {

                return resp.docs;
              })
    );

  }
  cargarConvocatory( id: string ) {

    const uri = this.url + '/convocatory/' + id;

    return this.http.get( uri ).pipe(
              map( (resp: any) => resp.convocatory )
    );

  }
  deleteConvocatory( id: string) {

    let uri = this.url + '/convocatory/' + id;

    return this.http.delete( uri ).pipe(
      map( resp => {
        this.snackService.warn('Se ha borrado correctamente la convocatoria');
        return resp;
      })
    );
  }

  guardarConvocatory( convocatory: Convocatory ) {

    let uri = this.url + '/convocatory';

    if ( convocatory._id ) {
      // actualizando
      uri += '/' + convocatory._id;

      return this.http.put( uri, convocatory ).pipe(
                map( (resp: any) => {
                  this.snackService.success('Se ha actualizado correctamente la convocatoria ' + convocatory.titulo);
                  return resp.convocatory;

                })
                );

    }else {
      // creando

      return this.http.post( uri, convocatory ).pipe(
              map( (resp: any) => {
                this.snackService.success('Se ha creado correctamente la convocatoria ' + convocatory.titulo);
                return resp.convocatory;
              }));
    }




  }

  guardarDoc( doc: Doc ) {

    let uri = this.url + '/doc';

      console.log(doc);

      return this.http.post( uri, doc ).pipe(
              map( (resp: any) => {
                this.snackService.success('Se ha creado correctamente el documento ' + doc.titulo);
                return resp.doc;
              }));





  }

  actualizarDoc( doc: Doc ) {

    let uri = this.url + '/doc/' + doc._id;


    return this.http.put( uri, doc ).pipe(
              map( (resp: any) => {

                this.snackService.success('Se ha actualizado correctamente el documento ' + doc.titulo);
                return resp.doc;
              }));

  }

  deleteDoc( id: string) {

    let uri = this.url + '/doc/' + id;

    return this.http.delete( uri ).pipe(
      map( resp => {
        this.snackService.warn('Se ha borrado correctamente el documento');
        return resp;
      })
    );
  }

  searchConvocatories( term: string) {
    // console.log('busqueda', term);
    const uri = this.url + '/search/for/convocatories/' + term;
    return this.http.get( uri ).pipe(
            map( ( resp: any ) => resp.convocatories )
    );
  }

}

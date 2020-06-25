import { Injectable } from '@angular/core';
import { GLOBAL } from '../global.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: string ) {

    return new Promise(( resolve, reject ) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('image', file, file.name);
      xhr.onreadystatechange = () => {

      if ( xhr.readyState === 4) {

        if ( xhr.status === 200 ) {
          console.log ( 'La imagen se subio correctamente' );
          resolve( JSON.parse(xhr.response)  );

        } else {
          console.log('Falló la subida de imagen');
          reject( JSON.parse(xhr.response) );
        }
      }

    };

      const url = GLOBAL.urlServices + '/upload/' + type + '/' + id;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );

  });


  }

  uploadArch(file: File, type: string, id: string ) {

    return new Promise(( resolve, reject ) => {

      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('sfile', file, file.name);
      xhr.onreadystatechange = () => {

      if ( xhr.readyState === 4) {

        if ( xhr.status === 200 ) {
          console.log ( 'El archivo se subio correctamente' );
          resolve( JSON.parse(xhr.response)  );

        } else {
          console.log('Falló la subida del archivo');
          reject( JSON.parse(xhr.response) );
        }
      }

    };

      const url = GLOBAL.urlServices + '/uploadfile/' + type + '/' + id;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );

  });


  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { GLOBAL } from '../services/global.service';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(image: string, type: string = 'user'): any {

    let url = GLOBAL.urlServices + '/image';

    if (!image) {

      // console.log('estro');
      return url + '/users/noImage';
    }

    // if (image.indexOf('https') >= 0 ) {
    //     return image;
    // }

    switch( type ) {

      case 'user':
         url += '/users/' + image;
        break;
      case 'publication':
        url += '/publications/' + image;
        break;
      case 'notification':
        url += '/notifications/' + image;
        break;
      default :
        console.log('Tipo de imagen no existe');
        url += '/users/noImage';
        break;

    }
    return url;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Convocatory } from '../models/convocatory.model';

@Pipe({
  name: 'convFilter'
})
export class ConvFilterPipe implements PipeTransform {

  transform(items: Convocatory[], arg: any): any[] {
    if (!items) { return []; }
    if (!arg || arg.length < 3) { return items; }
    const result = [];
    let found: boolean;

    for ( const conv of items ) {
      found = false;
      if ( (conv.titulo.toLowerCase().indexOf(arg.toLowerCase()) > -1 ||
          conv.correo.toLowerCase().indexOf(arg.toLowerCase()) > -1 )
        ) {
          result.push(conv);
      }
    }

    return result;
  }
}

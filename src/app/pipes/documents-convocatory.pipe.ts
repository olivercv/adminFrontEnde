import { Pipe, PipeTransform } from '@angular/core';
import { Doc } from '../models/doc.model';

@Pipe({
  name: 'documentsConvocatory'
})
export class DocumentsConvocatoryPipe implements PipeTransform {

  validDocuments: Doc[] = [];

  transform(documents: Doc[], convocatoryId: string): Doc[] {
    documents.forEach(document => {

      if (document.convocatory === convocatoryId ) {
        this.validDocuments.push(document);
      }

    });

    return this.validDocuments;
  }

}

import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { MenuPipe } from './menu.pipe';
import { DocumentsConvocatoryPipe } from './documents-convocatory.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagePipe,
    MenuPipe,
    DocumentsConvocatoryPipe
  ],
  exports: [
    ImagePipe,
    MenuPipe,
    DocumentsConvocatoryPipe
  ]
})
export class PipesModule { }

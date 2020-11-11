import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { MenuPipe } from './menu.pipe';
import { DocumentsConvocatoryPipe } from './documents-convocatory.pipe';
import { ConvFilterPipe } from './conv-filter.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagePipe,
    MenuPipe,
    DocumentsConvocatoryPipe,
    ConvFilterPipe
  ],
  exports: [
    ImagePipe,
    MenuPipe,
    DocumentsConvocatoryPipe,
    ConvFilterPipe
  ]
})
export class PipesModule { }

import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { MenuPipe } from './menu.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagePipe,
    MenuPipe
  ],
  exports: [
    ImagePipe,
    MenuPipe
  ]
})
export class PipesModule { }

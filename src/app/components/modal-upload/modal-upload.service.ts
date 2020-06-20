import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public hide: string = 'hide';

  public modalNotification = new EventEmitter<any>();

  constructor() {
    console.log('Modal Upload listo');
    console.log('debe aparecer el modal', this.hide);
   }

   hideModal() {

    this.hide = 'hide';
    this.id = null;
    this.type = null;

    console.log('entro a hide Modal');
   }
   showModal( type: string, id: string ) {

    this.hide = '';
    this.id = id;
    this.type = type;
    console.log('entro a show Modal');

   }
}

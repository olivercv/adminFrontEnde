import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalFileUploadService {
  public type: string;
  public id: string;
  public modalNotification = new EventEmitter<any>();
  
  constructor() { }

  hideModal() {
    this.id = null;
    this.type = null;
   }
   showModal( type: string, id: string ) {
    this.id = id;
    this.type = type;

   }
   
}

import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  imageUpload: File;
  imageTemp: any;

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadService: ModalUploadService
  ) {


   }

  ngOnInit(): void {}

  closeModal() {
    this.imageTemp = null;
    this.imageUpload = null;
    this.modalUploadService.hideModal();

  }

  selectImage( file: File ) {
    console.log('srchivo', file);
    if ( !file) {
      alert('Solo puede subir imagenes');
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      console.error('No se pudo cargar la imagen previia porque no se cargo una imagen ');
      this.imageUpload = null;
      return;
    }


    this.imageUpload = file;
    // console.log(event);
    
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imageTemp = reader.result;
  }

  uploadImage() {

    this.uploadFileService.uploadFile(this.imageUpload, this.modalUploadService.type, this.modalUploadService.id)
            .then( resp => {
              console.log( resp );
              this.modalUploadService.modalNotification.emit( resp );
              this.closeModal();

            })
            .catch( err => {
              console.log( 'Error en la carga de iimagen ');
            });
  }


}

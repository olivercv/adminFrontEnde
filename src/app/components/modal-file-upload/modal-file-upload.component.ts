import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../services/upload-file/upload-file.service';
import { ModalFileUploadService } from './modal-file-upload.service';



@Component({
  selector: 'app-modal-file-upload',
  templateUrl: './modal-file-upload.component.html',
  styles: []
})
export class ModalFileUploadComponent implements OnInit {

  fileUpload: File;
  iconFile = '../assets/images/icon/file.png';

  constructor(
    public uploadFileService: UploadFileService,
    public modalUploadFileService: ModalFileUploadService
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.iconFile = '../assets/images/icon/file.png';
    this.fileUpload = null;
    this.modalUploadFileService.hideModal();

  }

  selectFile( file: File ) {

     console.log('archivo', file);

     if ( !file) {
      alert('Solo puede subir archivos PDF, DOC o EXCEL');
      this.fileUpload = null;
      return;
    }

     if (file.type.indexOf('application') < 0 ) {
      console.error('No se pudo cargar el archivo porque no es un tipo archivo valido ');
      this.fileUpload = null;
      return;
    }

     this.fileUpload = file;

     if (file.type.indexOf('pdf') > 0) {
      this.iconFile = '../assets/images/icon/pdf.png';
     }

     if (file.type.indexOf('excel') > 0 || file.type.indexOf('officedocument.spreadsheetml.sheet') > 0 || file.type.indexOf('csv') > 0 ) {
      this.iconFile = '../assets/images/icon/xls.png';
     }
     if (file.type.indexOf('officedocument.wordprocessingml.document') > 0) {
      this.iconFile = '../assets/images/icon/doc.png';
     }

  }

  uploadFile() {

    this.uploadFileService.uploadArch(this.fileUpload, this.modalUploadFileService.type, this.modalUploadFileService.id)
            .then( resp => {
              console.log( resp );
              this.modalUploadFileService.modalNotification.emit( resp );
              this.closeModal();

            })
            .catch( err => {
              console.log( 'Error en la carga del archivo ');
            });
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Doc } from 'src/app/models/doc.model';
import { ConvocatoryService } from 'src/app/services/service.index';
import { SnackService } from 'src/app/services/snack.service';
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
  convocatoryId: string;
  doc: Doc = new Doc("", "", "", "", "", "");
  constructor(
    public uploadFileService: UploadFileService,
    private dialogRef: MatDialogRef<ModalFileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalFileUploadComponent,
    private _convocatoryService: ConvocatoryService,
    private snackService: SnackService,
  ) { }

  ngOnInit(): void {

  }

  onCloseDialog(){
    this.fileUpload = null;
    this.dialogRef.close();
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

  guardarDoc() {

    if (!this.data.convocatoryId) {
      this.onCloseDialog;
    }
    else{
      if (this.fileUpload.type.indexOf('pdf') > 0 || this.fileUpload.type.indexOf('excel') > 0 || this.fileUpload.type.indexOf('officedocument.spreadsheetml.sheet') > 0 || this.fileUpload.type.indexOf('csv') > 0 || this.fileUpload.type.indexOf('officedocument.wordprocessingml.document') > 0)
      {
        this.doc.titulo = "Nuevo Documento";
        this.doc.convocatory = this.data.convocatoryId;
        this._convocatoryService.guardarDoc(this.doc).subscribe(doc => {

          this.uploadFileService.uploadArch(this.fileUpload, 'docs', doc._id);
          this.snackService.success('Se ha cargado correctamente el archivo ');

        });
      }
      else{
        this.snackService.warn('No se pudo cargar el archivo porque no es un tipo archivo valido ');
      }


    }
  }


}

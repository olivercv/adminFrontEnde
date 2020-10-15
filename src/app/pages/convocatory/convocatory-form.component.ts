import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalFileUploadService } from '../../components/modal-file-upload/modal-file-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ModalFileUploadComponent } from '../../components/modal-file-upload/modal-file-upload.component';
import { Convocatory } from '../../models/convocatory.model';
import { ConvocatoryService } from '../../services/convocatory/convocatory.service';
import { Doc } from '../../models/doc.model';


@Component({
  selector: 'app-convocatory-form',
  templateUrl: './convocatory-form.component.html',
  styleUrls: []
})
export class ConvocatoryFormComponent implements OnInit {

  convocatory: Convocatory = new Convocatory("","",new Date(),new Date(),new Date(),new Date(),"","");
  doc: Doc = new Doc("","","","","","");
  docs: Doc [] = [];

  iconFile = '../assets/images/icon/file.png';
  constructor(
    public _convocatoryService: ConvocatoryService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadFileService: ModalFileUploadService,
    public dialog: MatDialog
  ) {
    activatedRoute.params.subscribe(params=>{
      let id = params['id'];
      if( id !== 'nuevo' ){
        this.cargarConvocatory(id);
      }
    })
   }

  ngOnInit(): void {
    this.cargarDocs();
  }



  cargarConvocatory( id: string ) {
    this._convocatoryService.cargarConvocatory( id )
          .subscribe( convocatory => {

            console.log( convocatory );
            this.convocatory = convocatory;

          });
  }

  guardarConvocatory( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._convocatoryService.guardarConvocatory( this.convocatory )
            .subscribe( convocatory => {

              this.convocatory._id = convocatory._id;

              this.router.navigate(['/convocatory', convocatory._id ]);

            });

  }

  guardarDoc(  id: string ) {

    this.doc.titulo = 'Nuevo Documento';
    this.doc.convocatory = id;
    console.log(this.doc);
    if ( !id ) {
      return;
    }

    this._convocatoryService.guardarDoc( this.doc )
            .subscribe( doc => {

              this.doc._id = doc._id;

              this.cargarDocs();
              this.router.navigate(['/convocatory', doc.convocatory ]);

            });

}

guardarDocumento( doc: Doc) {

  this._convocatoryService.actualizarDoc( doc )
          .subscribe();

}

deleteDoc( doc: Doc ) {

  this._convocatoryService.deleteDoc( doc._id )
          .subscribe ( () => this.cargarDocs() );

}

cargarDocs() {
  this._convocatoryService.cargarDocs()
          .subscribe( docs => this.docs = docs );
}

changeFile(id: string) {
  this.dialog.open(ModalFileUploadComponent);
  this.modalUploadFileService.showModal( 'docs', id );

  this.modalUploadFileService.modalNotification
              .subscribe( (resp: any) => {
                // console.log(resp);
                this.changeIcon(resp.doc.sfile);
              });
}

changeIcon(sfile) {

  if (sfile == undefined) {
    return;
  }
  const ext = sfile.split('.');
  // console.log('extencion', ext);

  if (ext[1] === 'pdf') {
    this.iconFile = '../assets/images/icon/pdf.png';
  }

  if (ext[1] === 'docx' || ext[1] === 'doc') {
    this.iconFile = '../assets/images/icon/doc.png';
  }

  if (ext[1] === 'xls' || ext[1] === 'xlsx') {
    this.iconFile = '../assets/images/icon/xls.png';
  }

}

}

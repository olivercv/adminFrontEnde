import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalFileUploadService } from "../../components/modal-file-upload/modal-file-upload.service";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { ModalFileUploadComponent } from "../../components/modal-file-upload/modal-file-upload.component";
import { Convocatory } from "../../models/convocatory.model";
import { ConvocatoryService } from "../../services/convocatory/convocatory.service";
import { Doc } from "../../models/doc.model";

@Component({
  selector: "app-convocatory-form",
  templateUrl: "./convocatory-form.component.html",
  styleUrls: [],
})
export class ConvocatoryFormComponent implements OnInit {
  convocatory: Convocatory = new Convocatory(
    "",
    "",
    new Date(),
    new Date(),
    new Date(),
    new Date(),
    "",
    ""
  );
  doc: Doc = new Doc("", "", "", "", "", "");
  documents: Doc[] = [];
  iconFile = "../assets/images/icon/file.png";
  constructor(
    public _convocatoryService: ConvocatoryService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadFileService: ModalFileUploadService,
    public dialog: MatDialog
  ) {
    activatedRoute.params.subscribe((params) => {
      let id = params["id"];
      if (id !== "nuevo") {
        this.cargarConvocatory(id);
      }
    });
  }

  ngOnInit(): void {
    if (this.convocatory._id) {
      this.cargarConvocatory(this.convocatory._id);
    }
  }

  cargarConvocatory(id: string) {
    this._convocatoryService.cargarConvocatory(id).subscribe((convocatory) => {

      this.convocatory = convocatory;
      this.documents = convocatory.docs;

    });
  }

  guardarConvocatory(f: NgForm) {

    if (f.invalid) {
      return;
    }

    this._convocatoryService
      .guardarConvocatory(this.convocatory)
      .subscribe((convocatory) => {
        this.convocatory._id = convocatory._id;
        this.cargarConvocatory(this.convocatory._id);
        this.router.navigate(["/convocatory", convocatory._id]);
      });
  }

  guardarDoc() {

    if (!this.convocatory._id) {
      this.router.navigate(["/convocatory"]);
    }
    else{

      this.doc.titulo = "Nuevo Documento";
      this.doc.convocatory = this.convocatory._id;
      this._convocatoryService.guardarDoc(this.doc).subscribe(() => {
        this.cargarConvocatory(this.convocatory._id);
        this.router.navigate(['/convocatory', this.convocatory._id ]);

      });
    }
  }

  guardarDocumento(doc: Doc) {
    this._convocatoryService
      .actualizarDoc(doc)
      .subscribe(() => this.cargarConvocatory(this.convocatory._id));
  }

  deleteDoc(doc: Doc) {
    this._convocatoryService
      .deleteDoc(doc._id)
      .subscribe(() => this.cargarConvocatory(this.convocatory._id));
  }

  openFileUploadDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = {convocatoryId: this.convocatory._id};
    const documentDialogRef = this.dialog.open(ModalFileUploadComponent, dialogConfig);
    documentDialogRef.afterClosed().subscribe( result => {
      this.cargarConvocatory(this.convocatory._id);
    });

  }

  changeFile(id: string) {
    this.dialog.open(ModalFileUploadComponent);
    this.modalUploadFileService.showModal("docs", id);

    this.modalUploadFileService.modalNotification.subscribe((resp: any) => {
      //console.log('doc archivo',resp);
      this.cargarConvocatory(this.convocatory._id);
      this.changeIcon(resp.doc.sfile);
    });
  }

  changeIcon(sfile) {
    if (!sfile) {
      this.iconFile = "../assets/images/icon/add-file.png";
      return;
    }
    const ext = sfile.split(".");
    //console.log('extencion', ext);

    if (ext[1] === "pdf") {
      this.iconFile = "../assets/images/icon/pdf.png";
    }

    if (ext[1] === "docx" || ext[1] === "doc") {
      this.iconFile = "../assets/images/icon/doc.png";
    }

    if (ext[1] === "xls" || ext[1] === "xlsx" || ext[1] === "csv") {
      this.iconFile = "../assets/images/icon/xls.png";
    }
  }
}

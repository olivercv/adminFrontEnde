import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { Notification } from '../../models/notification.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUploadComponent } from 'src/app/components/modal-upload/modal-upload.component';
import { ModalFileUploadComponent } from 'src/app/components/modal-file-upload/modal-file-upload.component';
import { ModalFileUploadService } from '../../components/modal-file-upload/modal-file-upload.service';


@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styles: []
})
export class NotificationFormComponent implements OnInit {

  public types = [
    {value: '1', viewValue: 'Urgente'},
    {value: '2', viewValue: 'Moderado'},
    {value: '3', viewValue: 'Normal'},
    {value: '4', viewValue: 'Información'}
  ];

  notification: Notification = new Notification('', new Date() , '', '', true, 0, 1, '', '');
  iconFile = '../assets/images/icon/file.png';
  constructor(
    public notificationService: NotificationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService,
    public modalUploadFileService: ModalFileUploadService,
    public dialog: MatDialog
  ) {

    activatedRoute.params.subscribe( params => {
          const id = params.id;
          // console.log('identificador ', id);
          if ( id !== 'new') {
            this.getNotification( id );
          }
    });

   }

  ngOnInit(): void {
    this.modalUploadService.modalNotification
        .subscribe( resp => {
          this.notification.image = resp.notification.image;
        });

    this.modalUploadFileService.modalNotification
        .subscribe( resp => {
          this.notification.sfile = resp.notification.sfile;
        });
    
  }

  saveNotification( f: NgForm ) {
    // console.log( f.valid );
    // console.log( f.value );

    if ( !f.valid ) {
      return;
    }

    this.notificationService.saveNotification( this.notification )
          .subscribe( notification => {
            this.notification._id = notification._id;
            this.router.navigate(['/notification', notification._id]);
            // console.log( notification );
          });
  }

  getNotification( id: string ) {
    this.notificationService.getNotification( id )
            .subscribe( notification => {
              this.notification = notification;
              // console.log('notificación', this.notification);
              this.changeIcon(this.notification.sfile);
            } );
  }

  changePhoto() {

    this.dialog.open(ModalUploadComponent);
    this.modalUploadService.showModal( 'notifications', this.notification._id );

    this.modalUploadService.modalNotification
                .subscribe( resp => {
                  // console.log(resp);
                });

  }

  changeFile() {
    this.dialog.open(ModalFileUploadComponent);
    this.modalUploadFileService.showModal( 'notifications', this.notification._id );

    this.modalUploadFileService.modalNotification
                .subscribe( (resp: any) => {
                  // console.log(resp);
                  this.changeIcon(resp.notification.sfile);
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

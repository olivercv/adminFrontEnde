import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { Notification } from '../../models/notification.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-notification-form',
  templateUrl: './notification-form.component.html',
  styles: []
})
export class NotificationFormComponent implements OnInit {

  public types = [
    {value: '1', viewValue: 'Tipo 1'},
    {value: '2', viewValue: 'Tipo 2'},
    {value: '3', viewValue: 'Tipo 3'}
  ];

  notification: Notification = new Notification('', new Date() , '', '', true, 0, 1, '');

  constructor(
    public notificationService: NotificationService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {
          const id = params['id'];
          console.log('identificador ', id);
          if ( id !== 'new') {
            this.getNotification( id );
          }
    });

   }

  ngOnInit(): void {
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
            this.router.navigate(['/notification', notification._id])
            // console.log( notification );
          });
  }

  getNotification( id: string ) {
    this.notificationService.getNotification( id )
            .subscribe( notification => this.notification = notification );
  }

  changePhoto() {

    this.modalUploadService.showModal( 'notification', this.notification._id );

    this.modalUploadService.modalNotification
                .subscribe( resp => {
                  console.log(resp);
                });

  }

}

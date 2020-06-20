import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from '../../services/notification/notification.service';
import { Notification } from '../../models/notification.model';


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

  notification: Notification = new Notification('', new Date() , '', '', true, 1, 1, '');

  constructor(
    public notificatioService: NotificationService
  ) { }

  ngOnInit(): void {
  }

  saveNotification( f: NgForm ) {
    console.log( f.valid );
    console.log( f.value );

    if ( !f.valid ) {
      return;
    }

    this.notificatioService.saveNotification( this.notification )
          .subscribe( notification => {
            console.log( notification );
          });
  }
}

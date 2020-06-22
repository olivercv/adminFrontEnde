import { Component, OnInit } from '@angular/core';
import { Notification } from '../../models/notification.model';
import { NotificationService } from '../../services/notification/notification.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styles: []
})
export class NotificationsComponent implements OnInit {

  loading = true;
  total = 0;
  notifications: Notification[] = [];
  to = 0;

  constructor(
      public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.loading = true;
    this.notificationService.getNotifications( this.to)
    .subscribe( (notifications) => {

      if(notifications) {
        this.total = this.notificationService.total;
      }
      this.notifications = notifications;
      this.loading = false;
    });
  }


  deleteNotification( notification: Notification ) {

    this.notificationService.deleteNotification( notification._id )
          .subscribe( () =>  this.getNotifications());

  }

  searchNotification( term: string) {

    if (term.length <= 0 ) {
      this.getNotifications();
      return;
    }

    this.notificationService.searchNotifications( term )
          .subscribe( notifications => this.notifications = notifications );

  }

  changePagination( value: number) {
    const to = this.to + value;
    // console.log( to );
    if (to >= this.total) {
      return;
    }

    if ( to < 0) {
      return;
    }
    this.to += value;
    this.getNotifications();
  }
}

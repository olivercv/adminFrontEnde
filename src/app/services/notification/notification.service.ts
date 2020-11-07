import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GLOBAL } from '../global.service';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { UserService } from '../service.index';
import { Notification } from '../../models/notification.model';
import { SnackService } from '../snack.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  total = 0;

  public token;
  user: User;
  public url: string;

  constructor(
    public http: HttpClient,
    public userService: UserService,
    private snackService: SnackService,
    ) {
    this.url = GLOBAL.urlServices;
  }

  getNotifications( to: number = 0 ) {
    const uri = this.url + '/notification?to=' + to;
    return this.http.get( uri ).pipe(
      map( ( resp: any ) => {
          this.total = resp.total;
          return resp.notifications;
      })
    );
  }

  getNotification( id: string ) {
    const uri = this.url + '/notification/' + id;
    return this.http.get( uri ).pipe(
          map( (resp: any) => resp.notification )
    );
  }



  deleteNotification( id: string) {

    let uri = this.url + '/notification/' + id;
    uri += '?token=' + this.userService.token;
    return this.http.delete( uri ).pipe(
      map( resp => {
        this.snackService.warn('Se ha borrado correctamente la notificacion');
        return resp;
      })
    );
  }

  updateNotification(notification: Notification) {
    let uri = this.url + '/notification/' + notification._id;
    uri += '?token=' + this.userService.token;

    return this.http.put( uri, notification ).pipe(
        map( (resp: any) => resp.notification )
    );
  }

  saveNotification( notification: Notification ) {
    let uri = this.url + '/notification';

    if ( notification._id ) {
      uri += '/' + notification._id;
      uri += '?token=' + this.userService.token;

      return this.http.put( uri, notification ).pipe(
              map( ( resp: any ) => {
                this.snackService.success('Se ha actualizado correctamente la notificacion ' + notification.title);
                return resp.notification;

              })
      );

    } else {
      // crea la notificación
      uri += '?token=' + this.userService.token;
      return this.http.post( uri, notification).pipe(
          map( (resp: any) => {
            this.snackService.success('Se ha creado correctamente la notificación');
            return resp.notification;
          })
      );

    }

  }

  searchNotifications( term: string) {
    // console.log('busqueda', term);
    const uri = this.url + '/search/for/notifications/' + term;
    return this.http.get( uri ).pipe(
            map( ( resp: any ) => resp.notifications )
    );
  }

}

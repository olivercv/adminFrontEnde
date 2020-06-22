import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { ModalUploadComponent } from 'src/app/components/modal-upload/modal-upload.component';
import { MatDialog } from '@angular/material/dialog';

declare var swal: any;


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  to = 0;
  total = 0;
  loading = true;

  constructor(  public userService: UserService, 
                public modalUploadService: ModalUploadService,
                public dialog: MatDialog
                ) { }

  ngOnInit(): void {
    this.getUsers();
    this.modalUploadService.modalNotification
                .subscribe( resp => this.getUsers() );
  }

  showModal( id: string) {
    this.dialog.open(ModalUploadComponent);
    this.modalUploadService.showModal( 'users', id );
  }

 

  getUsers() {
    this.loading = true;
    this.userService.getUsers( this.to)
          .subscribe( (resp: any ) => {
            // console.log( resp );
            this.total = resp.total;
            this.users = resp.users;
            this.loading = false;
          });
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

    this.getUsers ();


  }

  searchUser( term: string ) {
    // console.log( term );
    if ( term.length <= 0 ) {
      this.getUsers();
      return;
    }

    this.loading = true;


    this.userService.searchUsers( term )
          .subscribe ( ( users: User[]) => {
            this.users = users;
            this.loading = false;
          });
  }

  deleteUser( user: User ) {
    if (user._id === this.userService.user._id) {
      alert('No se puede borrar a si mismo');
      // console.log('No se puede borrar a si mismo');
      return;
    }

    // swal({
    //   title: 'Esta seguro?',
    //   text: 'Esta seguro de que quiere borrar a ' + user.name,
    //   icon: 'warning',
    //   buttons: true,
    //   dangerMode: true
    // })
    // .then( willDelete => {
    //   console.log( willDelete );

    //   if( willDelete ) {

    //   }
    // } )

    this.userService.deleteUser( user._id )
          .subscribe( deleted => {
            console.log( deleted );
            this.getUsers();
          });


  }

  saveUser( user: User ) {
    this.userService.updateUser( user )
        .subscribe();
  }

}

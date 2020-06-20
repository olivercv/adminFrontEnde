import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';
// import { read } from 'fs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;
  imageUpload: File;
  imageTemp: any;

  constructor( private userService: UserService ) {
    this.user = this.userService.user;

  }

  ngOnInit(): void {
  }

  save( user: User ) {
    console.log(user);

    this.user.name = user.name;
    this.user.email = user.email;

    this.userService.updateUser( this.user )
                .subscribe ();



  }

  selectImage( file: File ) {

    if ( !file) {
      this.imageUpload = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {
      console.error('No se pudo cargar la imagen previia porque no se cargo una imagen ');
      this.imageUpload = null;
      return;
    }


    this.imageUpload = file;
    // console.log(event);
    
    let reader = new FileReader();
    let urlImageTemp = reader.readAsDataURL( file );

    reader.onloadend = () => this.imageTemp = reader.result;
  }


  changeImage() {
    this.userService.changeImage( this.imageUpload, this.user._id);
  }

}

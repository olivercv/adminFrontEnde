import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUploadComponent } from 'src/app/components/modal-upload/modal-upload.component';
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from '../../services/publication/publication.service';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from '../../services/category/category.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styles: []
})
export class PublicationFormComponent implements OnInit {

  categories: Category[] = [];

  public types = [
    {value: '1', viewValue: 'Urgente'},
    {value: '2', viewValue: 'Moderado'},
    {value: '3', viewValue: 'Normal'},
    {value: '4', viewValue: 'Información'}
  ];

  publication: Publication = new Publication('', new Date() , '', '', '', '', true, 0, 1, '');
  constructor(
          public publicationService: PublicationService,
          public modalUploadService: ModalUploadService,
          public categoryService: CategoryService,
          public dialog: MatDialog,
          public router: Router,
          public activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.subscribe( params => {
      const id = params['id'];
      // console.log('identificador ', id);
      if ( id !== 'new') {
        this.getPublication( id );
      }
    });
  }

  ngOnInit(): void {

    this.categoryService.getCategories()
          .subscribe( categories => {
            // console.log('Resultado categorias ', resp);
            this.categories = categories;
          });

    this.modalUploadService.modalNotification
        .subscribe( resp => {
          this.publication.image = resp.publication.image;
        });
  }

  savePublication( f: NgForm ) {
    // console.log( f.valid );
    // console.log( f.value );

    if ( !f.valid ) {
      return;
    }

    this.publicationService.savePublication( this.publication )
          .subscribe( publication => {
            this.publication._id = publication._id;
            this.router.navigate(['/publication', publication._id])
            // console.log( publication );
          });
  }

  getPublication( id: string ) {
    this.publicationService.getPublication( id )
            .subscribe( publication => {
              this.publication = publication;
              this.publication.category = publication.category._id;
            } );
  }

  changePhoto() {

    this.dialog.open(ModalUploadComponent);
    this.modalUploadService.showModal( 'publications', this.publication._id );

    this.modalUploadService.modalNotification
                .subscribe( resp => {
                  console.log(resp);
                });

  }

}

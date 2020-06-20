import { Component, OnInit } from '@angular/core';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication/publication.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styles: []
})
export class PublicationsComponent implements OnInit {

  loading = true;
  total = 0;
  publications: Publication[] = [];
  to: number;

  constructor(
        public publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {

    this.publicationService.getPublications( this.to)
    .subscribe( (publications: Publication[]) => {
      console.log(publications);
      this.total = publications.length;
      this.publications = publications;
      this.loading = false;
    });
  }

  searchPublication( term: string ) {

    if (term.length <= 0) {
      this.getPublications();
      return;
    }

    this.publicationService.searchPublications( term )
          .subscribe( publications => this.publications = publications );

  }

  editPublication( publication: Publication ) {

  }
  deletePublication( publication: Publication ) {

    this.publicationService.deletePublication( publication._id )
            .subscribe ( () => this.getPublications() );

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

    this.getPublications ();


  }

}

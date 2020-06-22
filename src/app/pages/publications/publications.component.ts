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
  to = 0;

  constructor(
        public publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    this.getPublications();
  }

  getPublications() {
    this.loading = true;
    this.publicationService.getPublications( this.to)
    .subscribe( (publications: Publication[]) => {
      if(publications) {
        this.total = this.publicationService.total;
      }
      this.publications = publications;
      this.loading = false;
    });
  }


  deletePublication( publication: Publication ) {

    this.publicationService.deletePublication( publication._id )
            .subscribe ( () => this.getPublications() );

  }


  searchPublication( term: string ) {

    if (term.length <= 0) {
      this.getPublications();
      return;
    }

    this.publicationService.searchPublications( term )
          .subscribe( publications => this.publications = publications );

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
    this.getPublications();
  }

}

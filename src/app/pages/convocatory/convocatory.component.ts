import { Component, OnInit } from '@angular/core';
import { Convocatory } from '../../models/convocatory.model';
import { ConvocatoryService } from '../../services/service.index';


@Component({
  selector: 'app-convocatory',
  templateUrl: './convocatory.component.html',
  styleUrls: []
})
export class ConvocatoryComponent implements OnInit {

  convocatories: Convocatory[]=[];
  loading = true;
  total=0;
  to = 0;
  constructor(
    public _convocatory: ConvocatoryService
  ) { }

  ngOnInit(): void {
    this.getConvocatories();
  }

  getConvocatories() {
    this.loading = true;
    this._convocatory.getConvocatories( this.to)
    .subscribe( (convocatories) => {

      if(convocatories) {
        this.total = this._convocatory.total;
      }
      this.convocatories = convocatories;
      this.loading = false;
    });
  }

  deleteConvocatory( convocatory: Convocatory ) {

    this._convocatory.deleteConvocatory( convocatory._id )
            .subscribe ( () => this.getConvocatories() );

  }
  searchConvocatory( term: string) {

    if (term.length <= 0 ) {
      this.getConvocatories();
      return;
    }

    this._convocatory.searchConvocatories( term )
          .subscribe( convocatories => this.convocatories = convocatories );

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
    this.getConvocatories();
  }


}

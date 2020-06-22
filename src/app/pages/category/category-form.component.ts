import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/models/category.model';


@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styles: []
})
export class CategoryFormComponent implements OnInit {

  category: Category = new Category('', '', '', true);

  constructor(
      public categoryService: CategoryService,
      public router: Router,
      public activatedRoute: ActivatedRoute
  ) { 

    activatedRoute.params.subscribe( params => {
      const id = params['id'];
      // console.log('identificador ', id);
      if ( id !== 'new') {
        this.getCategory( id );
      }
});
  }

  ngOnInit(): void {
  }

  saveCategory( f: NgForm ) {
    // console.log( f.valid );
    // console.log( f.value );

    if ( !f.valid ) {
      return;
    }

    this.categoryService.saveCategory( this.category )
          .subscribe( category => {
            this.category._id = category._id;
            this.router.navigate(['/category', category._id])
            // console.log( notification );
          });
  }

  getCategory( id: string ) {
    this.categoryService.getCategory( id )
            .subscribe( category => this.category = category );
  }

}

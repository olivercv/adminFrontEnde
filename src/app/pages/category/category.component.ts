import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: []
})
export class CategoryComponent implements OnInit {

  loading = true;
  total = 0;
  categories: Category[] = [];
  to = 0;

  constructor( public categoryService: CategoryService ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;
    this.categoryService.getCategories( this.to)
    .subscribe( (categories) => {

      if (categories) {
        this.total = this.categoryService.total;
      }
      this.categories = categories;
      this.loading = false;
    });
  }


  deleteCategory( category: Category ) {

    this.categoryService.deleteCategory( category._id )
          .subscribe( () =>  this.getCategories());

  }

  searchCategory( term: string) {

    if (term.length <= 0 ) {
      this.getCategories();
      return;
    }

    this.categoryService.searchCategories( term )
          .subscribe( categories => this.categories = categories );

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
    this.getCategories();
  }
}

import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-nopage-found',
  templateUrl: './nopage-found.component.html',
  styleUrls: ['./nopage-found.component.scss']
})
export class NopageFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    init_plugins();
  }

}

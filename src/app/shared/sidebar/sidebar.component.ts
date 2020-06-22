import { Component, OnInit } from '@angular/core';
import { SidebarService , UserService} from '../../services/service.index';
import { User } from '../../models/user.model';
import * as $ from 'jquery';
import * as jQuery from 'jquery';

declare function initMenu();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  user: User;
  constructor( public _sidebar: SidebarService, public userService: UserService ) { }

  ngOnInit(): void {
    initMenu();
    this.user = this.userService.user;
  }

}

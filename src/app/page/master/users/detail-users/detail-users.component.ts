import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/api/user';
import { Table as moduleTable } from 'src/app/shared/module/table';
import { Form } from 'src/app/shared/module/form';
import { Message } from 'src/app/shared/module/message';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedModule } from 'primeng/api';
import { Constant } from 'src/app/config/constant';
import { Messages } from 'src/app/config/messages';
import { Label } from 'src/app/config/label';
import { Utils } from 'src/app/utils/utils';

@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ...moduleTable, ...Form, ...Message, ToolbarModule, SharedModule],
  templateUrl: './detail-users.component.html'
})
export class DetailUsersComponent implements OnInit {

  constant = Constant; messages = Messages; label = Label;

  searchAll: string;
  
  today: Date = new Date();

  user: User = {};
  search: User = {};

  submitted: boolean = false;
  validEmail:boolean = false;

  statuses: any[] = [];
  group: any[] = [];

  constructor(private utils: Utils, private router: Router) { }

  ngOnInit(): void {

    this.user = history.state.data;
    this.search = history.state.search;
    this.searchAll = history.state.searchAll;
  }

  backToUser() {
    this.router.navigate(['master/users'], {state: {search:this.search,searchAll:this.searchAll}});
  }

}

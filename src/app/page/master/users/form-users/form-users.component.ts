import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
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
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-form-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ...moduleTable, ...Form, ...Message, ToolbarModule, SharedModule],
  templateUrl: './form-users.component.html'
})
export class FormUsersComponent implements OnInit {

  constant = Constant; messages = Messages; label = Label;

  searchAll: string;

  fg: FormGroup;
  
  today: Date = new Date();

  search: User = {};
  user: User = {};

  isNotnull:boolean = false;
  submitted: boolean = false;
  validEmail:boolean = false;
  saveUserDialog:boolean = false;

  statuses: any[] = [];
  group: any[] = [];

  constructor(  private utils: Utils, 
                private router: Router, 
                private fb: FormBuilder, 
                private userService: UserService
  ) { }

  ngOnInit(): void {
    this.search = history.state.search;
    this.searchAll = history.state.searchAll;
    this.initFormGroup();
    if(history.state.data){
      this.isNotnull = true;
      this.user = history.state.data;
    }else{
      this.isNotnull = false;
    }
    if(this.user){
      this.fg.patchValue(this.user);
      this.fg.markAllAsTouched();
      this.validateEmail(this.user.email);
    }
  }

  initFormGroup(){
    this.fg = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: [null, [Validators.required]],
      website: [null, [Validators.required]],
      company: [null, [Validators.required]],
    })
  }

  validateEmail(dt: any) {
    if(this.fg.controls['email'].hasError('pattern') || dt == '' || dt == null){
      this.validEmail=false;
    }else{
      this.validEmail=true;
    }
  }
  
  saveUser() {
    this.submitted = true;

    if (!this.fg.controls['name'].errors && !this.fg.controls['username'].errors && this.validEmail && 
        !this.fg.controls['address'].errors && !this.fg.controls['website'].errors && !this.fg.controls['company'].errors) {
      this.saveUserDialog = true;
    }
  }

  confirmSaveUser() {
    
    this.saveUserDialog = false;
    this.utils.showLoading();
    for (const i in this.fg.controls) {
      this.user[i] = this.fg.controls[i].value;
    }

    if(history.state.data){
      this.userService.updateUser(this.user).then( (data:any) => {
        this.utils.showNotification(this.messages.success_type, this.messages.success_title, this.messages.updated_user);
        this.router.navigate(['master/users'], { state:{data:this.user, update:true} });
        this.utils.hideLoading();
      });
    }else{
      this.userService.addUsers(this.user).then( (data:any) => {
        this.user.id = this.createId();
        this.utils.showNotification(this.messages.success_type, this.messages.success_title, this.messages.created_user);
        this.router.navigate(['master/users'], { state:{data:this.user, update:false} });
        this.utils.hideLoading();
      });
    }
    
  }

  createId(): string {
      let id = '';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }

  backToUser() {
    this.router.navigate(['master/users'], {});
  }

}

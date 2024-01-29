import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { Table } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from 'src/app/api/user';
import { UserService } from 'src/app/service/user.service';
import { Table as moduleTable } from 'src/app/shared/module/table';
import { Form } from 'src/app/shared/module/form';
import { Message } from 'src/app/shared/module/message';
import { Constant } from 'src/app/config/constant';
import { Messages } from 'src/app/config/messages';
import { Label } from 'src/app/config/label';
import { Utils } from 'src/app/utils/utils';

@Component({
    templateUrl: './users.component.html',
    providers: [],
    standalone: true,
    imports: [CommonModule, ...moduleTable, ...Form, ...Message, ToolbarModule, SharedModule, FormsModule]
})
export class UsersComponent implements OnInit {

    @ViewChild('dt', { static: false }) table: Table
    
    constant = Constant; messages = Messages; label = Label;

    deleteUserDialog: boolean = false;

    deleteUsersDialog: boolean = false;

    searchDialog: boolean = false;
    
    validEmail: boolean = false;

    users: User[] = [];

    selectedUsers: User[] = [];

    submitted: boolean = false;

    searchAll: string = '';

    searchValue: User = {};

    searchAllFilter: any = [];

    cols: any[] = [];

    statuses: any[] = [];

    group: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private userService: UserService, 
        private utils: Utils, 
        private router: Router
    ) { }

    ngOnInit() {
        this.users = this.userService.users;

        var hData = history.state.data;
        if(hData){
            this.users.unshift(history.state.data);
        }

        var hSearch = history.state.search;
        if(hSearch){
            this.utils.showLoading();
            setTimeout(() => {
                this.searchAllFilter.forEach((element, index) => {
                    if(hSearch[element]) {
                        this.searchValue[element] = hSearch[element];
                        this.table.filter(hSearch[element], this.constant[element], this.constant.matchMode);
                    }
                    if((index+1) === this.searchAllFilter.length){
                        this.utils.hideLoading();
                    }
                });
            }, 500);
        }

        var hSearchAll = history.state.searchAll;
        if(hSearchAll){
            setTimeout(() => {
                if(hSearchAll){this.searchAll = hSearchAll; this.table.filterGlobal(hSearchAll, this.constant.matchMode);}
            }, 500);
        }

        this.searchAllFilter = [
            'name',
            'username',
            'email',
            'address',
            'website',
            'company',
        ];

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'username', header: 'Username' },
            { field: 'email', header: 'Email' },
            { field: 'address', header: 'Address' },
            { field: 'website', header: 'Website' },
            { field: 'company', header: 'Company' },
        ];
    }

    openNew() {
        this.router.navigate(['master/form-users'], {});
    }

    detailUser(user: any) {
        this.router.navigate(['master/detail-users'], { state: {
            data:user, 
            search:this.searchValue, 
            searchAll:this.searchAll
        } });
    }

    deleteSelectedUsers() {
        this.deleteUsersDialog = true;
    }

    editUser() {
        this.utils.showNotification(this.messages.warning_type, this.messages.success_title, this.messages.updated_user);
    }

    deleteUser() {
        this.deleteUserDialog = true;
    }

    confirmDeleteSelected() {
        this.deleteUsersDialog = false;
        this.utils.showNotification(this.messages.error_type, this.messages.success_title, this.messages.delete_users);
        this.selectedUsers = [];
    }

    confirmDelete() {
        this.deleteUserDialog = false;
        this.utils.showNotification(this.messages.error_type, this.messages.success_title, this.messages.delete_user);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, this.constant.matchMode);
    }

    onFilter(table: Table, event: Event, field: string) {
        table.filter((event.target as HTMLInputElement).value, field, this.constant.matchMode);
    }

    clearSearch(dt: Table) {
        dt.reset();
        this.searchValue = {};
        this.searchAll = '';
    }
}

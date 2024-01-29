import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppMenuitemComponent } from './app.menuitem.component';
import { NgFor, NgIf } from '@angular/common';
import { Utils } from '../utils/utils';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, private utils: Utils) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Menu',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
                    { label: 'User', icon: 'pi pi-fw pi-users', routerLink: ['/master/users'] },
                    { label: 'Logout', icon: 'pi pi-fw pi-sign-out', routerLink: ['/login'], command: () => this.logout() },
                ]
            }
        ];
    }

    logout() {
        this.utils.clearAllLocalstorage();
        window.location.reload();
    }
}

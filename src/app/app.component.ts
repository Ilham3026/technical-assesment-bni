import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Router, RouterOutlet } from '@angular/router';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { Utils } from './utils/utils';
import { UserService } from './service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, NgxUiLoaderModule]
})
export class AppComponent implements OnInit {

    constructor(
        private userService: UserService, 
        private primengConfig: PrimeNGConfig, 
        private utils: Utils, 
        private router: Router
    ) { }

    ngOnInit() {
        this.utils.showLoading();
        this.userService.getUsers().then( (data:any) => {
            data = data.map((e: any) => {
                return {
                    id: e.id,
                    name: e.name,
                    username: e.username,
                    email: e.email,
                    address: e.address.street,
                    website: e.website,
                    company: e.company.name
                };
            });
            this.userService.users = data;
        });

        var isLogin = this.utils.getLocalStorage('isLogin');

        if(isLogin != 'true'){
            this.router.navigate(['login'],{});
        }
        
        setTimeout(() => {
            this.utils.hideLoading();
        }, 500);
        
        this.primengConfig.ripple = true;
    }
}

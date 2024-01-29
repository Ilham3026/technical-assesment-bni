import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { Label } from 'src/app/config/label';
import { Messages } from 'src/app/config/messages';
import { Utils } from 'src/app/utils/utils';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    standalone: true,
    imports: [InputTextModule, PasswordModule, FormsModule, CheckboxModule, ButtonModule, RouterLink, ToastModule]
})
export class LoginComponent {

    label = Label; messages = Messages;

    password!: string;
    
    username!: string;

    constructor(public layoutService: LayoutService, private utils: Utils, private router: Router) { 
        var isLogin = utils.getLocalStorage('isLogin');

        if(isLogin == 'true'){
            router.navigate([''],{});
        }
    }

    login() {
        var username = 'admin';
        var password = 'admin';

        if(this.username === username && this.password === password) {
            this.utils.setLocalStorage('isLogin', 'true');
            window.location.reload();
        }else{
            this.utils.showNotification(this.messages.error_type, this.messages.error_password_title, this.messages.error_password, true);
        }

    }
}
